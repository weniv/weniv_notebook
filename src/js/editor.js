// 코드 에디터 관련 요소 추가(헤더, 코드 추가 버튼 등)
const notebookSection = document.querySelector('.notebook');
const pyReplElement = document.querySelector('py-repl');

const setHeader = (targetNode) => {
    const editorContainer = targetNode.querySelector('.cm-editor');
    const button = targetNode.querySelector('.py-repl-run-button');
    const header = document.createElement('header');
    header.setAttribute('class', 'cm-header');

    if (button) {
        button.setAttribute('data-tooltip', 'Run');
        button.classList.add('btn-play', 'show-tooltip');
        button.style.position = 'relative';
        addTooltipEvent(button);
    }

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'btn-list');
    ul.innerHTML = `
                <li class='show-tooltip' data-tooltip='Download code'>
                    <button type='button' class='btn-code-download'>
                        <span class='sr-only'>download code</span>
                    </button>
                </li>
                <li class='show-tooltip' data-tooltip='Upload code'>
                    <button type='button' class='btn-code-upload'>
                        <span class='sr-only'>upload code</span>
                    </button>
                </li>
                <li class='show-tooltip' data-tooltip='Delete Cell'>
                    <button type='button' class='btn-close code-delete'>
                        <span class='sr-only'>delete code</span>
                    </button>
                </li>
            `;

    const listItems = ul.querySelectorAll('.show-tooltip');
    listItems.forEach((item) => {
        addTooltipEvent(item);
    });

    ul.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            switch (e.target.className) {
                case 'btn-code-download':
                    downloadCode(e.target);
                    break;
                case 'btn-code-upload':
                    uploadCode(e.target);
                    break;
                case 'btn-close code-delete':
                    // 만약 셀이 하나 밖에 없다면 동작하지 않는다.
                    if (document.querySelectorAll('py-repl').length === 1) {
                        alert(
                            '셀이 하나 밖에 없는 경우, 코드를 삭제할 수 없습니다.',
                        );
                        return;
                    }
                    deleteCode(e.target);
                    break;
            }
        }
    });

    header.append(button, ul);
    editorContainer && editorContainer.appendChild(header);
};

const setAddCodeButton = (targetNode) => {
    const pyRepl =
        targetNode.tagName === 'PY-REPL'
            ? targetNode
            : targetNode.closest('PY-REPL');
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'py-repl-btn-wrap');
    buttonContainer.innerHTML = `
        <button type='button' class='btn-add-code add-code-next'>
            Add code
        </button>
    `;
    // 중간 셀 추가 기능
    buttonContainer.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            addCodeNextCellFromSelectCell(e.target);
        }
    });

    pyRepl && pyRepl.after(buttonContainer);
};

const observePyRepl = (mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (const addedNode of mutation.addedNodes) {
                if (
                    addedNode.tagName === 'PY-REPL' ||
                    addedNode.className.includes('py-repl')
                ) {
                    setHeader(addedNode);
                    setAddCodeButton(addedNode);
                }
            }
        }
    });
};

const ReplObserver = new MutationObserver(observePyRepl);
ReplObserver.observe(notebookSection, { childList: true });
ReplObserver.observe(pyReplElement, { childList: true });
