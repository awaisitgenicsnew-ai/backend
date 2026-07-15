const { Project } = require('../models');

/**
 * Get all projects
 */
exports.getAllProjects = async (req, res) => {
  try {
    const { status, badge, publication_status } = req.query;

    const where = {};
    if (status) where.status = status;
    if (badge) where.badge = badge;
    if (publication_status) where.publication_status = publication_status;

    const projects = await Project.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects.',
    });
  }
};

/**
 * Get project by ID
 */
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project.',
    });
  }
};

/**
 * Create new project
 */
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      location,
      badge,
      status,
      publication_status,
      description,
      type,
      handover,
      payment,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      imageAlt,
    } = req.body;

    // Handle image upload
    let image = null;
    if (req.files && req.files.image && req.files.image[0]) {
      image = `/uploads/${req.files.image[0].filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    // Handle multiple images upload
    let images = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      images = req.files.images.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      try {
        images = JSON.parse(req.body.images);
      } catch (e) {
        images = [];
      }
    }

    const project = await Project.create({
      title,
      location,
      badge: badge || null,
      status: status || 'In Planning',
      publication_status: publication_status || 'draft',
      description,
      type,
      handover,
      payment,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      image,
      images,
      imageAlt,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project.',
    });
  }
};

/**
 * Update project
 */
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      location,
      badge,
      status,
      publication_status,
      description,
      type,
      handover,
      payment,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      imageAlt,
    } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Handle image upload
    let image = project.image;
    if (req.files && req.files.image && req.files.image[0]) {
      image = `/uploads/${req.files.image[0].filename}`;
    } else if (req.body.image !== undefined) {
      image = req.body.image;
    }

    // Handle multiple images upload
    let images = project.images || [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      images = req.files.images.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images !== undefined) {
      try {
        images = JSON.parse(req.body.images);
      } catch (e) {
        images = project.images || [];
      }
    }

    await project.update({
      title,
      location,
      badge: badge || null,
      status,
      publication_status,
      description,
      type,
      handover,
      payment,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      image,
      images,
      imageAlt,
    });

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project.',
    });
  }
};

/**
 * Delete project
 */
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project.',
    });
  }
};
