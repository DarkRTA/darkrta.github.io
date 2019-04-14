echo '[' > emotes.json
curl https://api.twitchemotes.com/api/v4/channels/0 https://api.twitchemotes.com/api/v4/channels/72957565| jq ".emotes[]" | sed "s/^}$/},/g" | head -n -1 >> emotes.json
echo '}]' >> emotes.json
