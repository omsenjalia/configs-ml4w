# ML4W Dotfiles Configuration

Personal configuration files (dotfiles) for ML4W (Linux for Wayland) desktop environment.

## Overview

This repository contains optimized dotfiles and configuration scripts for a Hyprland-based Wayland desktop setup. The configurations are designed to be portable, efficient, and easy to maintain.

## Components

### Scripts

- **`updater`** - Automated git sync script with error handling and validation
- **`wallpaperchanger`** - Intelligent wallpaper rotation with pywal integration
- **`vm`** - VMware network service management utility

### Configuration Files  

- **`.bashrc_custom`** - Optimized bash configuration with pyenv integration
- **`.config/hyprpanel/`** - HyprPanel configuration with custom layouts
- **`.config/neofetch/`** - System information display configuration
- **`.config/ml4w-hyprland-settings/`** - ML4W Hyprland-specific settings

## Features

- **Optimized performance** - Reduced redundant configurations and improved efficiency
- **Error handling** - Robust scripts with proper validation and error checking
- **Portability** - Environment-agnostic configurations using variables instead of hardcoded paths
- **Modularity** - Clean separation of concerns and reusable components

## Usage

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/omsenjalia/configs-ml4w.git ~/configs-ml4w

# Source the custom bash configuration
source ~/configs-ml4w/.bashrc_custom

# Update dotfiles (runs autosync and git operations)
~/configs-ml4w/updater
```

### Wallpaper Management

```bash
# Change wallpaper once
./wallpaperchanger --single

# Run with custom directory and interval
./wallpaperchanger --dir ~/Pictures/wallpapers --interval 600

# Show help for all options
./wallpaperchanger --help
```

### VMware Integration

```bash
# Start VMware networks
./vm start

# Check VMware network status
./vm status

# Stop VMware networks
./vm stop
```

## Environment Variables

Customize behavior using these environment variables:

```bash
# Dotfiles configuration
export DOTFILES_USER="username"           # Target user for sync operations
export DOTFILES_HOME="/home/username"     # User home directory
export DOTFILES_REPO="/path/to/repo"      # Repository location

# Wallpaper configuration  
export WALLPAPER_DIR="~/Pictures/walls"   # Wallpaper directory
export CHANGE_INTERVAL="600"              # Change interval in seconds
export PYWALFOX_UPDATE="false"            # Disable pywalfox integration
```

## Requirements

- **Hyprland** - Wayland compositor
- **swww** - Wallpaper daemon for Wayland
- **pywal** - Color scheme generator
- **pywalfox** - Firefox pywal integration (optional)
- **pyenv** - Python version management (optional)
- **rsync** - File synchronization

## Optimization Features

- **Eliminated redundant pyenv configurations** in bashrc
- **Added dependency checking** for wallpaper script
- **Implemented intelligent swww management** (only restart when needed)  
- **Enhanced error handling** across all scripts
- **Made paths configurable** instead of hardcoded
- **Added comprehensive gitignore** for better repo hygiene
- **Improved script documentation** and help systems

## Contributing

Feel free to fork this repository and adapt it to your needs. Pull requests for improvements and optimizations are welcome.

## License

Personal dotfiles configuration - use and modify as needed.
