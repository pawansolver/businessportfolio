const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Exact service values from Contact.tsx dropdownServices
const SERVICE_TYPES = [
  "web-dev",
  "ecommerce",
  "mobile-app",
  "ui-ux",
  "saas-software",
  "digital-marketing",
  "graphic-branding",
  "maintenance-support",
];

const STATUS_TYPES = ["new", "read", "replied", "archived"];

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:   true,
    },

    // ── Form field: Name (required)
    name: {
      type:      DataTypes.STRING(100),
      allowNull: false,
    },

    // ── Form field: Email (required)
    email: {
      type:      DataTypes.STRING(255),
      allowNull: false,
    },

    // ── Form field: Phone (optional)
    phone: {
      type:         DataTypes.STRING(20),
      allowNull:    true,
      defaultValue: "",
    },

    // ── Form field: Service dropdown (optional)
    service: {
      type:      DataTypes.ENUM(...SERVICE_TYPES),
      allowNull: true,
    },

    // ── Form field: Message textarea (required)
    message: {
      type:      DataTypes.TEXT,
      allowNull: false,
    },

    // ── Backend: Status tracking
    status: {
      type:         DataTypes.ENUM(...STATUS_TYPES),
      defaultValue: "new",
    },

    // ── Backend: Admin notes
    notes: {
      type:         DataTypes.TEXT,
      allowNull:    true,
      defaultValue: "",
    },

    // ── Backend: Visitor IP for spam detection
    ip_address: {
      type:         DataTypes.STRING(45),
      allowNull:    true,
      defaultValue: "",
    },
  },
  {
    tableName:  "contacts",
    timestamps: true,       // createdAt, updatedAt
    underscored: true,      // camelCase → snake_case in DB (created_at, updated_at)
    indexes: [
      { fields: ["status"] },
      { fields: ["service"] },
      { fields: ["email"] },
      { fields: ["created_at"] },
    ],
  }
);

module.exports = { Contact, SERVICE_TYPES, STATUS_TYPES };
