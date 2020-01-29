// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'], // we're passing data through this component

    template: `
        <li>
            <p class="new-message">
                <span>{{ msg.message.name}} says:</span>
                {{ msg.message.content }}
            </p>
        </li>
    `,

    data: function() {
        return {message: "hello from the template"};
    } 

}