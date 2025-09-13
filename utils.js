/**
 * MCUCSYA Configuration
 * Application configuration constants
 */
const MCUCSYA_CONFIG = {
    validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+254|0)[17]\d{8}$/,
        name: /^[a-zA-Z\s]{2,50}$/,
        minAge: 16,
        maxAge: 35
    },
    messages: {
        error: {
            required: "This field is required",
            invalidEmail: "Please enter a valid email address",
            invalidPhone: "Please enter a valid phone number (e.g., +254712345678 or 0712345678)"
        },
        success: {
            saved: "Data saved successfully",
            updated: "Data updated successfully",
            deleted: "Data deleted successfully"
        }
    },
    ui: {
        dateFormat: 'DD/MM/YYYY',
        itemsPerPage: 10
    },
    constituencies: [
        'Machakos Town',
        'Matungulu',
        'Kangundo',
        'Masinga',
        'Yatta',
        'Mwala',
        'Mavoko',
        'Kathiani'
    ]
};

/**
 * MCUCSYA Utility Functions
 * Common utility functions used throughout the application
 */
const MCUCSYAUtils = {
    
    /**
     * DOM Manipulation Utilities
     */
    dom: {
        /**
         * Get element by ID
         */
        getElementById: (id) => document.getElementById(id),
        
        /**
         * Get elements by class name
         */
        getElementsByClass: (className) => document.getElementsByClassName(className),
        
        /**
         * Query selector
         */
        querySelector: (selector) => document.querySelector(selector),
        
        /**
         * Query selector all
         */
        querySelectorAll: (selector) => document.querySelectorAll(selector),
        
        /**
         * Create element with attributes
         */
        createElement: (tag, attributes = {}, content = '') => {
            const element = document.createElement(tag);
            Object.keys(attributes).forEach(key => {
                element.setAttribute(key, attributes[key]);
            });
            if (content) element.innerHTML = content;
            return element;
        },
        
        /**
         * Add class to element
         */
        addClass: (element, className) => {
            if (element) element.classList.add(className);
        },
        
        /**
         * Remove class from element
         */
        removeClass: (element, className) => {
            if (element) element.classList.remove(className);
        },
        
        /**
         * Toggle class on element
         */
        toggleClass: (element, className) => {
            if (element) element.classList.toggle(className);
        },
        
        /**
         * Check if element has class
         */
        hasClass: (element, className) => {
            return element ? element.classList.contains(className) : false;
        },
        
        /**
         * Show element
         */
        show: (element) => {
            if (element) {
                element.style.display = 'block';
                element.classList.remove('d-none', 'hidden');
            }
        },
        
        /**
         * Hide element
         */
        hide: (element) => {
            if (element) {
                element.style.display = 'none';
                element.classList.add('d-none');
            }
        },
        
        /**
         * Toggle element visibility
         */
        toggle: (element) => {
            if (element) {
                if (element.style.display === 'none' || element.classList.contains('d-none')) {
                    this.show(element);
                } else {
                    this.hide(element);
                }
            }
        }
    },
    
    /**
     * Validation Utilities
     */
    validate: {
        /**
         * Validate email address
         */
        email: (email) => {
            return MCUCSYA_CONFIG.validation.email.test(email);
        },
        
        /**
         * Validate phone number (Kenyan format)
         */
        phone: (phone) => {
            return MCUCSYA_CONFIG.validation.phone.test(phone);
        },
        
        /**
         * Validate name
         */
        name: (name) => {
            return MCUCSYA_CONFIG.validation.name.test(name);
        },
        
        /**
         * Validate age
         */
        age: (dateOfBirth) => {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age >= MCUCSYA_CONFIG.validation.minAge && age <= MCUCSYA_CONFIG.validation.maxAge;
        },
        
        /**
         * Validate required field
         */
        required: (value) => {
            return value !== null && value !== undefined && value.toString().trim() !== '';
        },
        
        /**
         * Validate form data
         */
        formData: (data, requiredFields) => {
            const errors = {};
            const validateObj = MCUCSYAUtils.validate; // Avoid 'this' context issues
            
            requiredFields.forEach(field => {
                if (!validateObj.required(data[field])) {
                    errors[field] = MCUCSYA_CONFIG.messages.error.required;
                }
            });
            
            // Specific validations
            if (data.email && !validateObj.email(data.email)) {
                errors.email = MCUCSYA_CONFIG.messages.error.invalidEmail;
            }
            
            if (data.phone && !validateObj.phone(data.phone)) {
                errors.phone = MCUCSYA_CONFIG.messages.error.invalidPhone;
            }
            
            if (data.firstName && !validateObj.name(data.firstName)) {
                errors.firstName = "Please enter a valid first name";
            }
            
            if (data.lastName && !validateObj.name(data.lastName)) {
                errors.lastName = "Please enter a valid last name";
            }
            
            if (data.dateOfBirth && !validateObj.age(data.dateOfBirth)) {
                errors.dateOfBirth = `Age must be between ${MCUCSYA_CONFIG.validation.minAge} and ${MCUCSYA_CONFIG.validation.maxAge} years`;
            }
            
            return {
                isValid: Object.keys(errors).length === 0,
                errors
            };
        }
    },
    
    /**
     * Storage Utilities (In-memory for Claude.ai compatibility)
     */
    storage: {
        _storage: {},
        
        /**
         * Set item in storage
         */
        set: (key, value) => {
            try {
                this._storage[key] = JSON.parse(JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Storage set error:', error);
                return false;
            }
        },
        
        /**
         * Get item from storage
         */
        get: (key, defaultValue = null) => {
            try {
                return this._storage.hasOwnProperty(key) ? this._storage[key] : defaultValue;
            } catch (error) {
                console.error('Storage get error:', error);
                return defaultValue;
            }
        },
        
        /**
         * Remove item from storage
         */
        remove: (key) => {
            try {
                delete this._storage[key];
                return true;
            } catch (error) {
                console.error('Storage remove error:', error);
                return false;
            }
        },
        
        /**
         * Clear all storage
         */
        clear: () => {
            try {
                this._storage = {};
                return true;
            } catch (error) {
                console.error('Storage clear error:', error);
                return false;
            }
        },
        
        /**
         * Check if storage is available
         */
        isAvailable: () => {
            return true; // Always available for in-memory storage
        }
    },
    
    /**
     * Date Utilities
     */
    date: {
        /**
         * Format date
         */
        format: (date, format = MCUCSYA_CONFIG.ui.dateFormat) => {
            const d = new Date(date);
            if (isNaN(d.getTime())) return 'Invalid Date';
            
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            
            switch (format) {
                case 'DD/MM/YYYY':
                    return `${day}/${month}/${year}`;
                case 'MM/DD/YYYY':
                    return `${month}/${day}/${year}`;
                case 'YYYY-MM-DD':
                    return `${year}-${month}-${day}`;
                default:
                    return d.toLocaleDateString();
            }
        },
        
        /**
         * Get age from date of birth
         */
        getAge: (dateOfBirth) => {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        },
        
        /**
         * Check if date is in the future
         */
        isFuture: (date) => {
            return new Date(date) > new Date();
        },
        
        /**
         * Check if date is in the past
         */
        isPast: (date) => {
            return new Date(date) < new Date();
        },
        
        /**
         * Get time difference in days
         */
        daysDifference: (date1, date2) => {
            const oneDay = 24 * 60 * 60 * 1000;
            const firstDate = new Date(date1);
            const secondDate = new Date(date2);
            
            return Math.round(Math.abs((firstDate - secondDate) / oneDay));
        }
    },
    
    /**
     * String Utilities
     */
    string: {
        /**
         * Capitalize first letter
         */
        capitalize: (str) => {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        
        /**
         * Convert to title case
         */
        titleCase: (str) => {
            if (!str) return '';
            return str.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
        },
        
        /**
         * Generate random ID
         */
        generateId: (length = 8) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },
        
        /**
         * Slugify string
         */
        slugify: (str) => {
            if (!str) return '';
            return str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        },
        
        /**
         * Truncate string
         */
        truncate: (str, length = 100, suffix = '...') => {
            if (!str) return '';
            if (str.length <= length) return str;
            return str.substring(0, length).trim() + suffix;
        },
        
        /**
         * Remove HTML tags
         */
        stripHtml: (html) => {
            if (!html) return '';
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || '';
        }
    },
    
    /**
     * Array Utilities
     */
    array: {
        /**
         * Remove duplicates from array
         */
        unique: (arr) => {
            return [...new Set(arr)];
        },
        
        /**
         * Group array by property
         */
        groupBy: (arr, key) => {
            return arr.reduce((groups, item) => {
                const group = item[key];
                if (!groups[group]) groups[group] = [];
                groups[group].push(item);
                return groups;
            }, {});
        },
        
        /**
         * Sort array by property
         */
        sortBy: (arr, key, direction = 'asc') => {
            return arr.sort((a, b) => {
                const aVal = a[key];
                const bVal = b[key];
                
                if (direction === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
                }
            });
        },
        
        /**
         * Filter array by multiple criteria
         */
        filterBy: (arr, filters) => {
            return arr.filter(item => {
                return Object.keys(filters).every(key => {
                    if (!filters[key]) return true;
                    return item[key] && item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
                });
            });
        },
        
        /**
         * Paginate array
         */
        paginate: (arr, page = 1, itemsPerPage = MCUCSYA_CONFIG.ui.itemsPerPage) => {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            return {
                data: arr.slice(startIndex, endIndex),
                totalItems: arr.length,
                totalPages: Math.ceil(arr.length / itemsPerPage),
                currentPage: page,
                itemsPerPage: itemsPerPage,
                hasNext: endIndex < arr.length,
                hasPrev: page > 1
            };
        }
    },
    
    /**
     * URL Utilities
     */
    url: {
        /**
         * Get URL parameters
         */
        getParams: () => {
            const params = {};
            const urlParams = new URLSearchParams(window.location.search);
            for (const [key, value] of urlParams) {
                params[key] = value;
            }
            return params;
        },
        
        /**
         * Get specific URL parameter
         */
        getParam: (name, defaultValue = null) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name) || defaultValue;
        },
        
        /**
         * Update URL parameter
         */
        updateParam: (name, value) => {
            const url = new URL(window.location);
            url.searchParams.set(name, value);
            window.history.pushState({}, '', url);
        },
        
        /**
         * Remove URL parameter
         */
        removeParam: (name) => {
            const url = new URL(window.location);
            url.searchParams.delete(name);
            window.history.pushState({}, '', url);
        }
    },
    
    /**
     * Event Utilities
     */
    events: {
        /**
         * Add event listener with cleanup
         */
        on: (element, event, handler, options = {}) => {
            if (element) {
                element.addEventListener(event, handler, options);
                return () => element.removeEventListener(event, handler, options);
            }
            return () => {};
        },
        
        /**
         * Remove event listener
         */
        off: (element, event, handler, options = {}) => {
            if (element) {
                element.removeEventListener(event, handler, options);
            }
        },
        
        /**
         * Trigger custom event
         */
        trigger: (element, eventName, data = {}) => {
            if (element) {
                const event = new CustomEvent(eventName, { detail: data });
                element.dispatchEvent(event);
            }
        },
        
        /**
         * Debounce function
         */
        debounce: (func, wait = 300) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        /**
         * Throttle function
         */
        throttle: (func, limit = 100) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    },
    
    /**
     * Animation Utilities
     */
    animation: {
        /**
         * Smooth scroll to element
         */
        scrollTo: (element, offset = 0) => {
            if (element) {
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        },
        
        /**
         * Fade in element
         */
        fadeIn: (element, duration = 300) => {
            if (element) {
                element.style.opacity = '0';
                element.style.display = 'block';
                
                let start = null;
                const animate = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const opacity = Math.min(progress / duration, 1);
                    
                    element.style.opacity = opacity;
                    
                    if (progress < duration) {
                        requestAnimationFrame(animate);
                    }
                };
                
                requestAnimationFrame(animate);
            }
        },
        
        /**
         * Fade out element
         */
        fadeOut: (element, duration = 300) => {
            if (element) {
                let start = null;
                const animate = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const opacity = Math.max(1 - (progress / duration), 0);
                    
                    element.style.opacity = opacity;
                    
                    if (progress < duration) {
                        requestAnimationFrame(animate);
                    } else {
                        element.style.display = 'none';
                    }
                };
                
                requestAnimationFrame(animate);
            }
        }
    },
    
    /**
     * HTTP Utilities (for future API integration)
     */
    http: {
        /**
         * GET request
         */
        get: async (url, options = {}) => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('GET request error:', error);
                throw error;
            }
        },
        
        /**
         * POST request
         */
        post: async (url, data = {}, options = {}) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    body: JSON.stringify(data),
                    ...options
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('POST request error:', error);
                throw error;
            }
        },
        
        /**
         * PUT request
         */
        put: async (url, data = {}, options = {}) => {
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    body: JSON.stringify(data),
                    ...options
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('PUT request error:', error);
                throw error;
            }
        },
        
        /**
         * DELETE request
         */
        delete: async (url, options = {}) => {
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('DELETE request error:', error);
                throw error;
            }
        }
    },
    
    /**
     * Loading States
     */
    loading: {
        /**
         * Show loading spinner
         */
        show: (element, text = 'Loading...') => {
            if (element) {
                element.innerHTML = `
                    <div class="d-flex align-items-center justify-content-center p-4">
                        <div class="spinner-border me-2" role="status" style="color: var(--primary-color);">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span>${text}</span>
                    </div>
                `;
            }
        },
        
        /**
         * Hide loading spinner
         */
        hide: (element, originalContent = '') => {
            if (element) {
                element.innerHTML = originalContent;
            }
        }
    },
    
    /**
     * Notification Utilities
     */
    notify: {
        /**
         * Show success message
         */
        success: (message, duration = 5000) => {
            MCUCSYAUtils.notify.show(message, 'success', duration);
        },
        
        /**
         * Show error message
         */
        error: (message, duration = 5000) => {
            MCUCSYAUtils.notify.show(message, 'danger', duration);
        },
        
        /**
         * Show info message
         */
        info: (message, duration = 5000) => {
            MCUCSYAUtils.notify.show(message, 'info', duration);
        },
        
        /**
         * Show warning message
         */
        warning: (message, duration = 5000) => {
            MCUCSYAUtils.notify.show(message, 'warning', duration);
        },
        
        /**
         * Show notification
         */
        show: (message, type = 'info', duration = 5000) => {
            // Remove existing notifications first
            const existingNotifications = document.querySelectorAll('.notification-toast');
            existingNotifications.forEach(notif => notif.remove());
            
            const iconMap = {
                success: 'check-circle',
                danger: 'exclamation-triangle',
                warning: 'exclamation-circle',
                info: 'info-circle'
            };
            
            const notification = MCUCSYAUtils.dom.createElement('div', {
                class: `alert alert-${type} alert-dismissible notification-toast`,
                style: 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'
            }, `
                <i class="fas fa-${iconMap[type]} me-2"></i>
                ${message}
                <button type="button" class="btn-close" aria-label="Close"></button>
            `);
            
            // Add close functionality
            const closeBtn = notification.querySelector('.btn-close');
            closeBtn.addEventListener('click', () => notification.remove());
            
            document.body.appendChild(notification);
            
            // Auto-remove after duration
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }
    },
    
    /**
     * Form Utilities
     */
    form: {
        /**
         * Get form data as object
         */
        getData: (form) => {
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            return data;
        },
        
        /**
         * Set form data from object
         */
        setData: (form, data) => {
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        field.checked = data[key];
                    } else {
                        field.value = data[key];
                    }
                }
            });
        },
        
        /**
         * Clear form
         */
        clear: (form) => {
            form.reset();
            // Clear any error states
            const errorElements = form.querySelectorAll('.is-invalid');
            errorElements.forEach(el => el.classList.remove('is-invalid'));
            const feedbackElements = form.querySelectorAll('.invalid-feedback');
            feedbackElements.forEach(el => el.remove());
        },
        
        /**
         * Show field error
         */
        showError: (field, message) => {
            field.classList.add('is-invalid');
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.invalid-feedback');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = MCUCSYAUtils.dom.createElement('div', {
                class: 'invalid-feedback'
            }, message);
            
            field.parentNode.appendChild(errorDiv);
        },
        
        /**
         * Clear field error
         */
        clearError: (field) => {
            field.classList.remove('is-invalid');
            const errorDiv = field.parentNode.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.remove();
            }
        },
        
        /**
         * Show form errors
         */
        showErrors: (form, errors) => {
            // Clear existing errors
            this.clearErrors(form);
            
            Object.keys(errors).forEach(fieldName => {
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    this.showError(field, errors[fieldName]);
                }
            });
        },
        
        /**
         * Clear all form errors
         */
        clearErrors: (form) => {
            const errorFields = form.querySelectorAll('.is-invalid');
            errorFields.forEach(field => this.clearError(field));
        }
    }
};

// Initialize utility functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('MCUCSYA Utilities loaded successfully');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MCUCSYAUtils, MCUCSYA_CONFIG };
}