class Project { 
    templateElement: HTMLTemplateElement; 
    hostingElement: HTMLDivElement; 
    targettingElement: HTMLFormElement; 
    constructor () {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; 
        this.hostingElement = document.getElementById('app')! as HTMLDivElement; 
        const importedNode = document.importNode(this.templateElement.content, true);
        this.targettingElement = importedNode.firstElementChild as HTMLFormElement; 
        this.attach();  
    }
    private attach() {
        this.hostingElement.insertAdjacentElement('afterbegin', this.targettingElement); 
    }
}

const project = new Project; 
