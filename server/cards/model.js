class Card {
    name = null;
    desc = null;
    idList = '60538b94fd5b7a7d8c3151cf'; //Backlog
    idLabels = null;
    idMembers = '60538224b64e4a7e14b831f7'; //pablohenriquez18
    project = null;

    constructor({ name, desc, idLabels, project }) {
        this.setName(name);
        this.setDesc(desc);
        this.setIdLabels(idLabels);
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

    setIdLabels(idLabels) {
        if(typeof idLabels === 'string' && idLabels.trim().length > 0 && idLabels.indexOf(',') === -1) {
            this.idLabels = idLabels;
        } else {
            throw new Error('Tipo de incidencia incorrecto.');
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