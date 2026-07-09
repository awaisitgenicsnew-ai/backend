const { Author, Blog } = require('../models');

/**
 * Get all authors
 */
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: [{
        model: Blog,
        as: 'blogs',
        attributes: ['id', 'title', 'slug'],
      }],
      order: [['name', 'ASC']],
    });
    res.json({
      success: true,
      data: authors,
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch authors.',
    });
  }
};

/**
 * Get author by ID
 */
exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id, {
      include: [{
        model: Blog,
        as: 'blogs',
        attributes: ['id', 'title', 'slug', 'status'],
      }],
    });
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found.',
      });
    }

    res.json({
      success: true,
      data: author,
    });
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch author.',
    });
  }
};

/**
 * Create new author
 */
exports.createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    // Handle image upload
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }
    
    const author = await Author.create({
      name,
      bio,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Author created successfully.',
      data: author,
    });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create author.',
    });
  }
};

/**
 * Update author
 */
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    
    const author = await Author.findByPk(id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found.',
      });
    }

    // Handle image upload
    let image = author.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      image = req.body.image;
    }

    await author.update({
      name,
      bio,
      image,
    });

    res.json({
      success: true,
      message: 'Author updated successfully.',
      data: author,
    });
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update author.',
    });
  }
};

/**
 * Delete author
 */
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const author = await Author.findByPk(id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found.',
      });
    }

    await author.destroy();

    res.json({
      success: true,
      message: 'Author deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete author.',
    });
  }
};
