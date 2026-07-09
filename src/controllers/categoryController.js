const { Category } = require('../models');

/**
 * Get all categories
 */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']],
    });
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories.',
    });
  }
};

/**
 * Get category by ID
 */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category.',
    });
  }
};

/**
 * Create new category
 */
exports.createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    
    const category = await Category.create({
      name,
      slug,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Category with this name or slug already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create category.',
    });
  }
};

/**
 * Update category
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    await category.update({
      name,
      slug,
    });

    res.json({
      success: true,
      message: 'Category updated successfully.',
      data: category,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Category with this name or slug already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update category.',
    });
  }
};

/**
 * Delete category
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    await category.destroy();

    res.json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category.',
    });
  }
};
