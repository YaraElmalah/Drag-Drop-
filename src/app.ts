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

//Validation 
interface Validatable {
    value: string| number,
    required?: boolean, 
    minLength?: number, 
    maxLength?: number, 
    min?: number, 
    max?: number
}

function validate(validateInput: Validatable) {
    let isValid = true; 
    if(validateInput.required) {
        isValid = (isValid && validateInput.value.toString().trim().length !== 0)
    }
    if(validateInput.minLength && typeof validateInput.value === 'string') {
        isValid = (isValid && validateInput.value.toString().trim().length >= validateInput.minLength); 
    }
        if(validateInput.maxLength && typeof validateInput.value === 'string') {
        isValid = (isValid && validateInput.value.toString().trim().length <= validateInput.maxLength); 
    }
        if(validateInput.min && typeof validateInput.value === 'number') {
        isValid = (isValid && +validateInput.value >= validateInput.min); 
    }
        if(validateInput.max && typeof validateInput.value === 'number') {
        isValid = (isValid && validateInput.value<= validateInput.max); 
    }
    return isValid; 
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
        const validatedTitle: Validatable = {
            value: this.titleInputElement.value, 
            required: true, 
            minLength: 5 
        }; 
     const validatedDescription: Validatable = {
            value: this.descriptionInputElement.value, 
            required: true, 
            minLength: 5, 
            maxLength: 10
        }; 
             const validatedPeople: Validatable = {
            value: this.peopleInputElement.value, 
            required: true, 
            min: 1, 
            max: 100
        }; 
        if(!validate(validatedTitle)) {
            throw new Error('Title is not valid'); 
        }
        if(!validate(validatedDescription)) {
            throw new Error('Description is not valid'); 
        }
        if(!validate(validatedPeople)) {
            throw new Error('People Number is not valid'); 
        }
        console.log('Submittting Successfully'); 
        console.log('Title is ' + validatedTitle.value, 'Description is ' + validatedDescription.value, 'People Number is ' + validatedPeople.value);
        this.clearForm(); 
       
    }
    private configure() {
        this.targettingElement.addEventListener('submit', this.submitHandler); 
    }
    private clearForm() {
        this.titleInputElement.value = ''; 
        this.descriptionInputElement.value = ''; 
        this.peopleInputElement.value = '' ; 
    }
}

const project = new Project; 
