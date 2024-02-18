import Project from '../models/project.model.js'

const projects = Project;

const createProject = async (req, res) => {
    const { projectName } = req.body;
    const owner = req.user._id;

    if (projectName) {
        res.status(409, "Project with this name already exist")
    }

    const createProject = await projects.create({
        projectName,
        owner
    })
    return res.status(201).json({ message: `Project Created successfully by ${owner}`})
}

export { createProject }