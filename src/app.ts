//Start Autobind decorator
const autobind = (_: any, _2: String, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value; 
    const adjDescriptor: PropertyDescriptor  = {
        configurable: true, 
        get() {
            const bondFn = originalMethod.bind(this); 
            return bondFn; 
        }

    }; 
    return adjDescriptor; 
}

class Project { 
    templateElement: HTMLTemplateElement; 
    hostingElement: HTMLDivElement; 
    targettingElement: HTMLFormElement; 
    titleInputElement: HTMLInputElement; 
    descriptionInputElement: HTMLInputElement; 
    peopleInputElement: HTMLInputElement; 
    constructor () {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; 
        this.hostingElement = document.getElementById('app')! as HTMLDivElement; 
        const importedNode = document.importNode(this.templateElement.content, true);
        this.targettingElement = importedNode.firstElementChild as HTMLFormElement; 
        this.targettingElement.id = 'user-input'; 
        this.titleInputElement = this.targettingElement.querySelector('#title') as HTMLInputElement; 
        this.descriptionInputElement = this.targettingElement.querySelector('#description') as HTMLInputElement; 
        this.peopleInputElement = this.targettingElement.querySelector('#people') as HTMLInputElement; 
        this.attach();  
        this.configure(); 
    }
    private attach() {
        this.hostingElement.insertAdjacentElement('afterbegin', this.targettingElement); 
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault(); 
        console.log(this.titleInputElement.value); 
        console.log(this.descriptionInputElement.value); 
        console.log(this.peopleInputElement.value); 
    }
    private configure() {
        this.targettingElement.addEventListener('submit', this.submitHandler); 
    }
}

const project = new Project; 
