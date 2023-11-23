module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      productName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isSoldout: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      underscored: true,
      modelName: 'Product',
      tableName: 'products',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  )

  Product.associate = (db) => {
    db.Product.belongsTo(db.User, { foreignKey: 'author', targetKey: 'id' })
  }

  // 추가적인 관계 설정이나 메서드 등이 필요하면 여기에 추가할 수 있습니다.

  return Product
}
