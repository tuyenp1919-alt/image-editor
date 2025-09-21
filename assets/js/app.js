// Image Editor Application
class ImageEditor {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.originalImage = null;
        this.currentImage = null;
        this.history = [];
        this.historyIndex = -1;
        
        this.filters = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            filter: 'none'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.drawPlaceholder();
    }

    drawPlaceholder() {
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#999';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Tải ảnh lên để bắt đầu chỉnh sửa', 
                         this.canvas.width / 2, this.canvas.height / 2);
        
        // Draw upload icon
        this.ctx.font = '48px Arial';
        this.ctx.fillText('📁', this.canvas.width / 2, this.canvas.height / 2 - 50);
    }

    setupEventListeners() {
        // File upload
        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });

        document.getElementById('imageInput').addEventListener('change', (e) => {
            this.loadImage(e.target.files[0]);
        });

        // Download
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadImage();
        });

        // Control sliders
        const sliders = ['brightness', 'contrast', 'saturation', 'hue', 'blur'];
        sliders.forEach(slider => {
            const element = document.getElementById(slider);
            const valueDisplay = document.getElementById(slider + 'Value');
            
            element.addEventListener('input', (e) => {
                this.filters[slider] = parseInt(e.target.value);
                const suffix = slider === 'hue' ? '°' : slider === 'blur' ? 'px' : '%';
                valueDisplay.textContent = e.target.value + suffix;
                this.applyFilters();
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                e.target.classList.add('active');
                this.filters.filter = e.target.dataset.filter;
                this.applyFilters();
            });
        });

        // Action buttons
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetFilters();
        });

        document.getElementById('rotateBtn').addEventListener('click', () => {
            this.rotateImage();
        });

        document.getElementById('flipHBtn').addEventListener('click', () => {
            this.flipImage('horizontal');
        });

        document.getElementById('flipVBtn').addEventListener('click', () => {
            this.flipImage('vertical');
        });

        // Drag and drop
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.canvas.style.border = '3px dashed #007bff';
        });

        this.canvas.addEventListener('dragleave', () => {
            this.canvas.style.border = '1px solid #ddd';
        });

        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            this.canvas.style.border = '1px solid #ddd';
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                this.loadImage(files[0]);
            }
        });
    }

    loadImage(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Vui lòng chọn một file ảnh hợp lệ!');
            return;
        }

        this.showLoading(true);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.currentImage = img;
                this.resizeCanvas(img);
                this.drawImage();
                this.updateImageInfo(file);
                this.enableControls();
                this.resetFilters();
                this.showLoading(false);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    resizeCanvas(img) {
        const maxWidth = 800;
        const maxHeight = 600;
        
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.height = 'auto';
    }

    drawImage() {
        if (!this.currentImage) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.currentImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    applyFilters() {
        if (!this.originalImage) return;
        
        this.showLoading(true);
        
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Apply CSS filters
            this.ctx.filter = this.getCSSFilters();
            
            // Draw image with filters
            this.ctx.drawImage(this.originalImage, 0, 0, this.canvas.width, this.canvas.height);
            
            // Reset filter for future operations
            this.ctx.filter = 'none';
            
            this.showLoading(false);
        });
    }

    getCSSFilters() {
        const { brightness, contrast, saturation, hue, blur, filter } = this.filters;
        
        let filters = [
            `brightness(${brightness}%)`,
            `contrast(${contrast}%)`,
            `saturate(${saturation}%)`,
            `hue-rotate(${hue}deg)`,
            `blur(${blur}px)`
        ];

        // Add preset filters
        switch (filter) {
            case 'grayscale':
                filters.push('grayscale(100%)');
                break;
            case 'sepia':
                filters.push('sepia(100%)');
                break;
            case 'invert':
                filters.push('invert(100%)');
                break;
            case 'vintage':
                filters.push('sepia(30%) saturate(120%) contrast(110%)');
                break;
            case 'warm':
                filters.push('sepia(20%) saturate(120%) hue-rotate(10deg)');
                break;
            case 'cool':
                filters.push('saturate(120%) hue-rotate(180deg) brightness(110%)');
                break;
        }

        return filters.join(' ');
    }

    rotateImage() {
        if (!this.originalImage) return;
        
        this.showLoading(true);
        
        // Create temporary canvas for rotation
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // Swap dimensions
        tempCanvas.width = this.canvas.height;
        tempCanvas.height = this.canvas.width;
        
        // Rotate and draw
        tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
        tempCtx.rotate(Math.PI / 2);
        tempCtx.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);
        
        // Create new image from rotated canvas
        const img = new Image();
        img.onload = () => {
            this.originalImage = img;
            this.resizeCanvas(img);
            this.applyFilters();
            this.showLoading(false);
        };
        img.src = tempCanvas.toDataURL();
    }

    flipImage(direction) {
        if (!this.originalImage) return;
        
        this.showLoading(true);
        
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        
        tempCtx.save();
        
        if (direction === 'horizontal') {
            tempCtx.translate(tempCanvas.width, 0);
            tempCtx.scale(-1, 1);
        } else {
            tempCtx.translate(0, tempCanvas.height);
            tempCtx.scale(1, -1);
        }
        
        tempCtx.drawImage(this.canvas, 0, 0);
        tempCtx.restore();
        
        const img = new Image();
        img.onload = () => {
            this.originalImage = img;
            this.applyFilters();
            this.showLoading(false);
        };
        img.src = tempCanvas.toDataURL();
    }

    resetFilters() {
        this.filters = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            filter: 'none'
        };
        
        // Reset UI controls
        document.getElementById('brightness').value = 100;
        document.getElementById('contrast').value = 100;
        document.getElementById('saturation').value = 100;
        document.getElementById('hue').value = 0;
        document.getElementById('blur').value = 0;
        
        document.getElementById('brightnessValue').textContent = '100%';
        document.getElementById('contrastValue').textContent = '100%';
        document.getElementById('saturationValue').textContent = '100%';
        document.getElementById('hueValue').textContent = '0°';
        document.getElementById('blurValue').textContent = '0px';
        
        // Reset filter buttons
        document.querySelector('.filter-btn.active').classList.remove('active');
        document.querySelector('.filter-btn[data-filter="none"]').classList.add('active');
        
        if (this.originalImage) {
            this.applyFilters();
        }
    }

    downloadImage() {
        if (!this.canvas) return;
        
        const link = document.createElement('a');
        link.download = `edited-image-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }

    updateImageInfo(file) {
        const sizeKB = (file.size / 1024).toFixed(2);
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const sizeText = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
        
        document.getElementById('imageSize').textContent = `Kích thước: ${sizeText}`;
        document.getElementById('imageDimensions').textContent = 
            `Kích thước: ${this.originalImage.width} x ${this.originalImage.height}px`;
    }

    enableControls() {
        document.getElementById('downloadBtn').disabled = false;
        document.querySelectorAll('.control-group input').forEach(input => {
            input.disabled = false;
        });
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.disabled = false;
        });
        document.querySelectorAll('.action-buttons button').forEach(btn => {
            btn.disabled = false;
        });
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = show ? 'flex' : 'none';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ImageEditor();
});

// Add some utility functions
window.addEventListener('beforeunload', (e) => {
    // Warn user if they have unsaved changes
    const canvas = document.getElementById('canvas');
    if (canvas && canvas.width > 0 && canvas.height > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'o':
                e.preventDefault();
                document.getElementById('uploadBtn').click();
                break;
            case 's':
                e.preventDefault();
                document.getElementById('downloadBtn').click();
                break;
            case 'z':
                e.preventDefault();
                document.getElementById('resetBtn').click();
                break;
        }
    }
});

// Add PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}