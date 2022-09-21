const settings = {
    questions: {
        mode: {
            range: [
                {
                    type: 'input',
                    message: 'Business day from (YYYY-MM-DD):',
                    name: 'businessDayFrom'
                },
                {
                    type: 'input',
                    message: 'Business day to (YYYY-MM-DD):',
                    name: 'businessDayTo'
                }
            ],
            single: [
                {
                    type: 'input',
                    message: 'Folder:',
                    name: 'folder'
                }
            ]
        },
        filter: {
            "false": [],
            "true": [
                {
                    type: 'input',
                    message: 'Search keys (separated by whitespace):',
                    name: 'filterKeys'
                }
            ]
        }
    }
}

export default settings;