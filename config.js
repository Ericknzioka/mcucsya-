/**
 * MCUCSYA Website Configuration
 * Contains all configuration variables, constants, and settings
 */

// Website Configuration
const MCUCSYA_CONFIG = {
    // Organization Details
    organization: {
        name: "Machakos County Students and Youths Association",
        acronym: "MCUCSYA",
        founded: "2023",
        email: "info@mcucsya.org",
        phone: "+254 700 000 000",
        address: "Machakos Town, Machakos County"
    },

    // Social Media Links
    socialMedia: {
        instagram: "https://www.instagram.com/mcucsya?igsh=YzljYTk1ODg3Zg==",
        whatsapp: "https://chat.whatsapp.com/Jrzgcex9VaTDuSO4jtPKz1?mode=ac_t",
        facebook: "https://www.facebook.com/profile.php?id=100094290441020"
    },

    // Machakos County Constituencies
    constituencies: [
        {
            id: "machakos_town",
            name: "Machakos Town",
            description: "The county headquarters and administrative center",
            features: ["Administrative Hub", "Commercial Center", "Educational Institutions"]
        },
        {
            id: "matungulu",
            name: "Matungulu",
            description: "Known for its agricultural activities and rural development",
            features: ["Agriculture", "Rural Development", "Community Projects"]
        },
        {
            id: "kangundo",
            name: "Kangundo",
            description: "Rich in cultural heritage and community initiatives",
            features: ["Cultural Heritage", "Community Programs", "Youth Activities"]
        },
        {
            id: "masinga",
            name: "Masinga",
            description: "Home to the famous Masinga Dam and hydroelectric power",
            features: ["Masinga Dam", "Hydroelectric Power", "Water Resources"]
        },
        {
            id: "yatta",
            name: "Yatta",
            description: "Known for its vast plains and livestock farming",
            features: ["Livestock Farming", "Vast Plains", "Agricultural Activities"]
        },
        {
            id: "mwala",
            name: "Mwala",
            description: "Agricultural hub with vibrant community programs",
            features: ["Agricultural Hub", "Community Programs", "Food Production"]
        },
        {
            id: "mavoko",
            name: "Mavoko",
            description: "Industrial and commercial center of the county",
            features: ["Industrial Center", "Commercial Hub", "Business Activities"]
        },
        {
            id: "kathiani",
            name: "Kathiani",
            description: "Known for its educational institutions and cultural sites",
            features: ["Educational Institutions", "Cultural Sites", "Academic Excellence"]
        }
    ],

    // Leadership Structure
    leadership: {
        executive: [
            {
                id: "chairperson",
                title: "Chairperson",
                description: "Leading the association with vision and dedication",
                icon: "fas fa-crown",
                responsibilities: ["Strategic Leadership", "Vision Setting", "External Relations"]
            },
            {
                id: "deputy_chair",
                title: "Deputy Chairperson",
                description: "Supporting leadership and coordinating activities",
                icon: "fas fa-user-tie",
                responsibilities: ["Leadership Support", "Activity Coordination", "Internal Affairs"]
            },
            {
                id: "ict_manager",
                title: "ICT Manager",
                description: "Managing technology and digital platforms",
                icon: "fas fa-laptop-code",
                responsibilities: ["Technology Management", "Digital Platforms", "System Administration"]
            },
            {
                id: "secretary_general",
                title: "Secretary General",
                description: "Maintaining records and official communications",
                icon: "fas fa-file-alt",
                responsibilities: ["Record Keeping", "Communications", "Documentation"]
            },
            {
                id: "logistics_manager",
                title: "Logistics Manager",
                description: "Coordinating events and resource management",
                icon: "fas fa-truck",
                responsibilities: ["Event Coordination", "Resource Management", "Operations"]
            }
        ],
        committees: [
            {
                id: "disciplinary",
                title: "Disciplinary Committee",
                description: "Ensuring ethical conduct and resolving disputes",
                icon: "fas fa-balance-scale",
                responsibilities: ["Ethics Enforcement", "Dispute Resolution", "Code of Conduct"]
            }
        ],
        stakeholders: [
            {
                id: "community",
                title: "Community Stakeholders",
                description: "Local leaders and community representatives",
                icon: "fas fa-handshake",
                type: "community"
            },
            {
                id: "corporate",
                title: "Corporate Sponsors",
                description: "Supporting our initiatives and programs",
                icon: "fas fa-building",
                type: "corporate"
            }
        ]
    },

    // Form Configuration
    forms: {
        registration: {
            requiredFields: [
                "firstName", "lastName", "email", "phone", 
                "dateOfBirth", "gender", "constituency", "education"
            ],
            educationLevels: [
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
                { value: "certificate", label: "Certificate" },
                { value: "diploma", label: "Diploma" },
                { value: "bachelor", label: "Bachelor's Degree" },
                { value: "master", label: "Master's Degree" },
                { value: "phd", label: "PhD" }
            ],
            genderOptions: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
            ]
        }
    },

    // API Endpoints (for future backend integration)
    api: {
        baseUrl: "/api/v1",
        endpoints: {
            register: "/members/register",
            contact: "/contact/send",
            events: "/events",
            members: "/members",
            stats: "/stats"
        }
    },

    // Storage Keys
    storage: {
        members: "mcucsya_members",
        events: "mcucsya_events",
        contacts: "mcucsya_contacts",
        settings: "mcucsya_settings"
    },

    // Animation Settings
    animations: {
        duration: {
            fast: 200,
            normal: 300,
            slow: 500
        },
        easing: {
            default: "ease",
            smooth: "ease-in-out",
            bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        }
    },

    // Validation Rules
    validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+?254|0)[17]\d{8}$/,
        name: /^[a-zA-Z\s]{2,50}$/,
        minAge: 13,
        maxAge: 35
    },

    // Event Categories
    eventCategories: [
        { id: "leadership", name: "Leadership", color: "#2c5530" },
        { id: "education", name: "Education", color: "#4a7c59" },
        { id: "community", name: "Community Service", color: "#ffd700" },
        { id: "entrepreneurship", name: "Entrepreneurship", color: "#17a2b8" },
        { id: "technology", name: "Technology", color: "#6f42c1" },
        { id: "culture", name: "Culture & Arts", color: "#e83e8c" },
        { id: "sports", name: "Sports & Recreation", color: "#fd7e14" },
        { id: "networking", name: "Networking", color: "#20c997" }
    ],

    // Feature Flags
    features: {
        memberRegistration: true,
        eventManagement: true,
        onlinePayments: false,
        memberDirectory: false,
        notifications: true,
        multiLanguage: false
    },

    // UI Settings
    ui: {
        itemsPerPage: 12,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '12hour'
    },

    // Error Messages
    messages: {
        success: {
            registration: "Registration successful! Welcome to MCUCSYA family.",
            contact: "Message sent successfully! We'll get back to you soon.",
            update: "Information updated successfully."
        },
        error: {
            required: "This field is required.",
            invalidEmail: "Please enter a valid email address.",
            invalidPhone: "Please enter a valid phone number.",
            ageTooYoung: "You must be at least 13 years old to register.",
            ageTooOld: "This association is for youth (35 years and below).",
            serverError: "Something went wrong. Please try again later.",
            networkError: "Please check your internet connection and try again."
        },
        validation: {
            emailExists: "This email is already registered.",
            phoneExists: "This phone number is already registered.",
            weakPassword: "Password must be at least 8 characters long.",
            passwordMismatch: "Passwords do not match."
        }
    }
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MCUCSYA_CONFIG;
}

// Freeze the configuration object to prevent modifications
Object.freeze(MCUCSYA_CONFIG);