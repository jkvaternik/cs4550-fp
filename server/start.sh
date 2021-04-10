#!/bin/bash

export MIX_ENV=prod
export PORT=5699

CFGD=$(readlink -f ~/.config/rhapsody)

if [ ! -e "$CFGD/base" ]; then
    echo "run deploy first"
    exit 1
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://rhapsody:$DB_PASS@localhost/rhapsody_prod

_build/prod/rel/rhapsody/bin/rhapsody start
