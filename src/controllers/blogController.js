const { Blog, Author, Category } = require('../models');

/**
 * Get all blogs
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const { status, authorId, categoryId } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (authorId) where.authorId = authorId;

    const include = [
      {
        model: Author,
        as: 'author',
        attributes: ['id', 'name', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name', 'slug'],
        through: { attributes: [] },
      },
    ];

    let blogs;
    if (categoryId) {
      // Filter by category
      const category = await Category.findByPk(categoryId, {
        include: [
          {
            model: Blog,
            as: 'blogs',
            where,
            include,
          },
        ],
      });
      blogs = category ? category.blogs : [];
    } else {
      blogs = await Blog.findAll({
        where,
        include,
        order: [['createdAt', 'DESC']],
      });
    }

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs.',
    });
  }
};

/**
 * Get blog by ID
 */
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id, {
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'bio', 'image'],
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] },
        },
      ],
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog.',
    });
  }
};

/**
 * Get blog by slug
 */
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({
      where: { slug },
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'bio', 'image'],
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] },
        },
      ],
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog.',
    });
  }
};

/**
 * Create new blog
 */
exports.createBlog = async (req, res) => {
  try {
    const {
      metaTitle,
      metaDescription,
      slug,
      title,
      shortDescription,
      imageAlt,
      metaKeywords,
      mainContent,
      authorId,
      status,
      categoryIds,
    } = req.body;
    
    // Handle image upload
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }
    
    const blog = await Blog.create({
      metaTitle,
      metaDescription,
      slug,
      title,
      shortDescription,
      image,
      imageAlt,
      metaKeywords,
      mainContent,
      authorId,
      status: status || 'draft',
    });

    // Associate categories if provided
    if (categoryIds && categoryIds.length > 0) {
      await blog.setCategories(categoryIds);
    }

    // Fetch the blog with associations
    const blogWithAssociations = await Blog.findByPk(blog.id, {
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'image'],
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully.',
      data: blogWithAssociations,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Blog with this slug already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create blog.',
    });
  }
};

/**
 * Update blog
 */
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      metaTitle,
      metaDescription,
      slug,
      title,
      shortDescription,
      imageAlt,
      metaKeywords,
      mainContent,
      authorId,
      status,
      categoryIds,
    } = req.body;
    
    const blog = await Blog.findByPk(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    // Handle image upload
    let image = blog.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      image = req.body.image;
    }

    await blog.update({
      metaTitle,
      metaDescription,
      slug,
      title,
      shortDescription,
      image,
      imageAlt,
      metaKeywords,
      mainContent,
      authorId,
      status,
    });

    // Update categories if provided
    if (categoryIds !== undefined) {
      if (categoryIds.length > 0) {
        await blog.setCategories(categoryIds);
      } else {
        await blog.setCategories([]);
      }
    }

    // Fetch the blog with associations
    const blogWithAssociations = await Blog.findByPk(blog.id, {
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'image'],
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] },
        },
      ],
    });

    res.json({
      success: true,
      message: 'Blog updated successfully.',
      data: blogWithAssociations,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Blog with this slug already exists.',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update blog.',
    });
  }
};

/**
 * Delete blog
 */
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    const blog = await Blog.findByPk(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.',
      });
    }

    // Remove category associations
    await blog.setCategories([]);

    await blog.destroy();

    res.json({
      success: true,
      message: 'Blog deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog.',
    });
  }
};
