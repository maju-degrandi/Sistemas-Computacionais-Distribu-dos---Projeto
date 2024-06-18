#!/bin/sh
current_dir=$(basename "$PWD")

if [ "$current_dir" = "scripts" ]; then
  cd ..
fi

root_dir=$(pwd)

packages_dir="$root_dir/packages"

# Install base monorepo dependencies
echo "Installing main package dependencies..."
poetry install --no-root
npm install

# Loop through each subfolder within the packages directory
for package_dir in "$packages_dir"/*; do
  if [ -d "$package_dir" ]; then
    # If dir contains a pyproject.toml file, install its dependencies
    if [ -e "$package_dir/pyproject.toml" ]; then
      # Install each package's dependencies
      echo -e "\nInstalling dependencies for $(basename "$package_dir") using Poetry..."
      cd "$package_dir" && poetry install
      echo "Depedencies for $(basename "$package_dir") successfully installed!"
    fi
    # If dir contains a package.json file, install its dependencies
    if [ -e "$package_dir/package.json" ]; then
      # Install each package's dependencies
      echo -e "\nInstalling dependencies for $(basename "$package_dir") using NPM..."
      cd "$package_dir" && npm install
      echo "Depedencies for $(basename "$package_dir") successfully installed!"
    fi
  fi
done

cd "$root_dir"

# Install pre-commit hooks
echo -e "\nInstalling pre-commit hooks..."

hook_source="$root_dir/hooks/pre-commit"
hook_destination="$root_dir/.git/hooks/pre-commit"

if [ -e "$hook_destination" ]; then
  echo "A pre-commit hook already exists. Please remove it or replace it manually."
else
  ln -s "$hook_source" "$hook_destination"
  echo "Pre-commit hook symlinked successfully!"
fi

echo -e "Done."
