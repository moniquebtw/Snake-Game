projeto="/opt/DEV/projects/snake-game"
nginx="/var/www/html"

if [ -d "$projeto" ] && [ -d "$nginx" ]; then
  for file in "$projeto"/*; do
    if [ "$(basename "$file")" != "script.sh" ]; then
      cp -r "$file" "$nginx"/
    fi
  done
  echo "Arquivos copiados de $projeto para $nginx"
else
  echo "Verifique se as pastas de origem e destino existem."
fi