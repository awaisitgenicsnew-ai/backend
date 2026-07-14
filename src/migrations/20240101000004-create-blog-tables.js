module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Authors
    await queryInterface.createTable('authors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Categories
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Blogs
    await queryInterface.createTable('blogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      meta_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      meta_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      image_alt: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      meta_keywords: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      main_content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'authors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'archived'),
        allowNull: false,
        defaultValue: 'draft',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Blog-Category join table
    await queryInterface.createTable('blog_categories', {
      blog_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'blogs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    // Add indexes
    try {
      await queryInterface.addIndex('blogs', ['status']);
    } catch (error) {
      // Index might already exist, ignore error
      console.log('Index blogs_status might already exist, skipping...');
    }
    try {
      await queryInterface.addIndex('blogs', ['author_id']);
    } catch (error) {
      // Index might already exist, ignore error
      console.log('Index blogs_author_id might already exist, skipping...');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_categories');
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('authors');
  },
};
