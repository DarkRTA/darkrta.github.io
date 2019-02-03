curl https://twitchemotes.com/api_cache/v3/subscriber.json \
|jq '.["72957565"]' > tmp.json
echo '{ "72957565":' | cat - tmp.json > shift.json
echo '}' >> shift.json
rm tmp*.json
