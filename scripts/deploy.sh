#!/usr/bin/env bash
#
# Builds the site and uploads dist/ to the Strato docroot behind pollenkompass.hkn7b.dev.
#
# Dry run by default — it prints exactly what would be uploaded and deleted and touches
# nothing. Pass --go to actually transfer.
#
#   DEPLOY_TARGET='user@ssh.strato.de:/pollenkompass/' npm run deploy         # dry run
#   DEPLOY_TARGET='user@ssh.strato.de:/pollenkompass/' npm run deploy -- --go # for real
#
# Two passes, in this order, on purpose:
#   1. everything except the HTML, without --delete. Asset URLs are content-hashed, so the new
#      bundles land beside the old ones and the live page keeps working while the copy runs.
#   2. the HTML, with --delete, which flips the site to the new build and prunes the bundles
#      no build references any more.
# Reversing that order leaves a window where index.html asks for a bundle that isn't up yet.
set -euo pipefail

GO=0
[[ "${1:-}" == "--go" ]] && GO=1

if [[ -z "${DEPLOY_TARGET:-}" ]]; then
  echo "DEPLOY_TARGET is not set. Example:" >&2
  echo "  DEPLOY_TARGET='user@ssh.strato.de:/pollenkompass/' npm run deploy -- --go" >&2
  exit 1
fi

# --delete removes anything on the remote that is not in dist/, so the target has to be the
# site's own docroot and nothing wider. An allow-list, not a block-list: only an absolute path
# with at least one segment passes. Block-listing "/" and "~" was not enough — "user@host:.",
# "user@host:./" and "user@host:~/" all slipped through and each of them resolves to the SSH
# login's HOME, where --delete would erase every other site on the account.
if [[ "$DEPLOY_TARGET" != *:* ]]; then
  echo "DEPLOY_TARGET must be user@host:/absolute/path — got '$DEPLOY_TARGET'" >&2
  exit 1
fi
remote_path="${DEPLOY_TARGET#*:}"
if [[ ! "$remote_path" =~ ^/[^/].* ]] || [[ "$remote_path" == *".."* ]]; then
  echo "Refusing to sync with --delete into '$remote_path'." >&2
  echo "Name the docroot as an absolute path, e.g. user@host:/pollenkompass/ — a relative" >&2
  echo "path, '~', '.' or '/' resolves somewhere wider than this site." >&2
  exit 1
fi

npm run build

# The privacy policy is the URL both app stores point at; an empty dist/ would delete it.
for required in dist/index.html dist/privacy/index.html; do
  [[ -s "$required" ]] || { echo "missing or empty after build: $required" >&2; exit 1; }
done

rsync_flags=(-avz --human-readable)
if [[ $GO -eq 0 ]]; then
  rsync_flags+=(--dry-run)
  echo "── DRY RUN — nothing is transferred. Re-run with --go to deploy. ──"
fi

# The build does not produce these, so --delete would prune whatever the host put there.
# .well-known/ carries the ACME challenge files an HTTP-01 certificate renewal writes into the
# docroot: deleting one mid-renewal fails the renewal and eventually expires TLS on the URL
# both app stores point at. Kept out of both passes so the two agree on what they manage.
protected=(--exclude='.well-known/')

echo "→ pass 1/2: assets to $DEPLOY_TARGET"
rsync "${rsync_flags[@]}" "${protected[@]}" --exclude='*.html' dist/ "$DEPLOY_TARGET"

echo "→ pass 2/2: HTML, and pruning files no longer in the build"
rsync "${rsync_flags[@]}" "${protected[@]}" --delete dist/ "$DEPLOY_TARGET"

if [[ $GO -eq 0 ]]; then
  echo "── DRY RUN finished. Nothing changed on the server. ──"
else
  echo "Deployed. Verify: https://pollenkompass.hkn7b.dev/ and /privacy/"
fi
