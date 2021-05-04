class Card {
    name = null;
    desc = null;
    idList = null;
    idLabels = null;
    idMembers = null;
    project = null;

    constructor({ name, desc, idList, idLabels, idMembers, project }) {
        this.setName(name);
        this.setDesc(desc);
        this.setIdList(idList);
        this.setIdLabels(idLabels);
        this.setIdMembers(idMembers);
        this.setProject(project);
    }

    setName(name) {
        if(typeof name === 'string' && name.trim().length >= 5) {
            this.name = name;
        } else {
            throw new Error('Título de incidencia incorrecto.');
        }
    }

    setDesc(desc) {
        if(typeof desc === 'string' && desc.trim().length >= 10) {
            this.desc = desc;
        } else {
            throw new Error('Descripción de incidencia incorrecta.');
        }
    }

    setIdList(idList) {
        if(typeof idList === 'string' && idList.trim().length > 0 && idList.indexOf(',') === -1) {
            this.idList = idList;
        } else {
            throw new Error('Error interno, ID de lista incorrecta.');
        }
    }

    setIdLabels(idLabels) {
        if(typeof idLabels === 'string' && idLabels.trim().length > 0 && idLabels.indexOf(',') === -1) {
            this.idLabels = idLabels;
        } else {
            throw new Error('Tipo de incidencia incorrecto.');
        }
    }

    setIdMembers(idMembers) {
        if(typeof idMembers === 'string' && idMembers.trim().length > 0 && idMembers.indexOf(',') === -1) {
            this.idMembers = idMembers;
        } else {
            throw new Error('Error interno, ID de responsable incorrecto.');
        }
    }

    setProject(project) {
        if(typeof project === 'string' && project.trim().length > 0) {
            this.project = project;
        } else {
            throw new Error('Error interno, proyecto asignado inválido: ', project);
        }
    }

    toObject() {
        return {
            name: this.name,
            desc: this.desc,
            idList: this.idList,
            idLabels: this.idLabels,
            idMembers: this.idMembers,
            project: this.project
        };
    }
}

module.exports = Card;