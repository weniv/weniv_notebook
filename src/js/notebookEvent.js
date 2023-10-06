// 코드 추가
const addCode = () => {
    const notebookSection = document.getElementById('notebookSection');
    const newRepl = document.createElement('py-repl');
    newRepl.textContent = '';
    notebookSection.appendChild(newRepl);
};

// 다음셀 추가
const addCodeNextCellFromSelectCell = (target) => {
    const selectCell = target.target.parentNode;
    const nextCell = selectCell.nextElementSibling;
    const newCell = document.createElement('py-repl');
    newCell.innerHTML = ``;
    selectCell.parentNode.insertBefore(newCell, nextCell);
};

// 코드셀 삭제
const deleteCode = (target) => {
    const pyRepl = target.target.closest('py-repl');
    const nextpyReplBtnWrapFromPyRepl = pyRepl.nextElementSibling;
    nextpyReplBtnWrapFromPyRepl.remove();
    pyRepl.remove();
};

// 코드 다운로드
const downloadCode = (target) => {
    const pyRepl = target.target.closest('py-repl');
    const code = pyRepl.querySelector('.cm-content').innerText;
    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `code_${dateFormat()}.py`;
    link.click();
};

// 코드 업로드
const uploadCode = (target) => {
    const pyRepl = target.target.closest('py-repl');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            pyRepl.querySelector('.cm-content').innerText = e.target.result;
        };
        reader.readAsText(file);
    };
    input.click();
};

const downloadBtn = document.querySelector('.download-notebook');
downloadBtn.addEventListener('click', () => {
    downloadNotebook();
});

const downloadNotebook = () => {
    const notebook = {
        cells: [],
        metadata: {
            kernelspec: {
                display_name: 'Python 3',
                language: 'python',
                name: 'python3',
            },
            language_info: {
                codemirror_mode: {
                    name: 'ipython',
                    version: 3,
                },
                file_extension: '.py',
                mimetype: 'text/x-python',
                name: 'python',
                nbconvert_exporter: 'python',
                pygments_lexer: 'ipython3',
                version: '3.7.9',
            },
        },
        nbformat: 4,
        nbformat_minor: 4,
    };

    const cells = document.querySelectorAll('.py-repl-editor');

    for (let i = 0; i < cells.length; i++) {
        notebook.cells.push({
            cell_type: 'code',
            execution_count: null,
            metadata: {},
            outputs: [],
            // document.querySelector("#my-repl > div > div.py-repl-editor > div > div > div.cm-scroller > div.cm-content")
            source: cells[i].querySelector('.cm-content').innerText,
        });
    }
    const notebookJson = JSON.stringify(notebook, null, 2);
    const blob = new Blob([notebookJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = `notebook_${dateFormat()}.ipynb`;
    a.href = url;
    a.click();
};

const uploadBtn = document.querySelector('.upload-notebook');
uploadBtn.addEventListener('click', () => {
    uploadNotebook();
});

const uploadNotebook = () => {
    const notebookSection = document.getElementById('notebookSection');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ipynb';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (readerEvent) => {
            const content = readerEvent.target.result;
            const notebook = JSON.parse(content);
            const cells = notebook.cells;
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const source = cell.source;
                const newRepl = document.createElement('py-repl');
                newRepl.textContent = source;
                notebookSection.appendChild(newRepl);
            }
        };
    };
    input.click();
};

// addCode 이벤트 추가
const addCodeButton = document.querySelector('.main-header .add-code');
addCodeButton.addEventListener('click', () => {
    addCode();
});
