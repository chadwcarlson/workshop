#!/usr/bin/env bash

if [ -z "${PLATFORM_BRANCH}" ]; then
    # Allow for seeding by making .env writable temporarily.
    ln -s data/.env .env
else
    # Move committed files from temp directory back into mounts.
    # ./scripts/handle_mounts.sh
    
    # Food advisor seed data to SQLite.
    RELATIONSHIPS=$(echo $PLATFORM_RELATIONSHIPS | base64 --decode | jq '.keys')
    # Check to make sure seed has not already occurred, AND that PostgreSQL doesn't exist.
    if [ $RELATIONSHIPS = 'null' ] && [ ! -f ~/.seed/sqlite-seeded.txt ]; then
        yarn seed
        echo "SQLite database seeded" > ~/.seed/sqlite-seeded.txt
        mv ~/data/uploads/* ~/public/uploads/
    fi
fi
