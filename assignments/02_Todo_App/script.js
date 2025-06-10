class TodoApp {
    constructor() {
        this.todos = [];
        this.editingId = null;
        this.originalText = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        const modalInput = document.getElementById('modalInput');
        
        modalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.confirmModal();
            if (e.key === 'Escape') this.hideModal();
        });

        // 모달 배경 클릭시 닫기
        document.getElementById('inputModal').addEventListener('click', (e) => {
            if (e.target.id === 'inputModal') {
                this.hideModal();
            }
        });
    }

    showAddModal() {
        document.getElementById('modalInput').value = '';
        document.getElementById('inputModal').classList.add('show');
        
        setTimeout(() => {
            document.getElementById('modalInput').focus();
        }, 100);
    }

    hideModal() {
        document.getElementById('inputModal').classList.remove('show');
    }

    confirmModal() {
        const text = document.getElementById('modalInput').value.trim();
        
        if (!text) return;

        this.addTodo(text);
        this.hideModal();
    }

    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };

        this.todos.unshift(todo);
        this.render();
    }

    // 인라인 편집 시작
    startInlineEdit(id) {
        // 이미 편집 중인 항목이 있으면 먼저 저장하고 새로운 항목 편집 시작
        if (this.editingId && this.editingId !== id) {
            const currentEditInput = document.querySelector(`[data-edit-id="${this.editingId}"]`);
            if (currentEditInput) {
                this.saveInlineEdit(this.editingId, currentEditInput.value);
            }
        }

        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        this.editingId = id;
        this.originalText = todo.text;
        this.render();

        // 편집 모드로 렌더링 후 포커스 설정
        setTimeout(() => {
            const editInput = document.querySelector(`[data-edit-id="${id}"]`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }, 0);
    }

    // 인라인 편집 저장
    saveInlineEdit(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim() && newText.trim() !== this.originalText) {
            todo.text = newText.trim();
        }
        this.editingId = null;
        this.originalText = '';
        this.render();
    }

    // 인라인 편집 취소
    cancelInlineEdit() {
        this.editingId = null;
        this.originalText = '';
        this.render();
    }

    toggleTodo(id) {
        // 편집 중인 항목이 있어도 체크박스 동작은 허용
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }

    deleteTodo(id) {
        // 편집 중인 항목이 삭제되는 경우에만 편집 상태 초기화
        if (this.editingId === id) {
            this.editingId = null;
            this.originalText = '';
        }

        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
    }

    render() {
        const todoList = document.getElementById('todoList');
        
        if (this.todos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <h3>📝 할 일이 없습니다</h3>
                    <p>새로운 할 일을 추가해보세요!</p>
                </div>
            `;
        } else {
            todoList.innerHTML = this.todos.map(todo => `
                <div class="todo-item ${todo.completed ? 'completed' : 'active'} ${this.editingId === todo.id ? 'editing' : ''}">
                    <input type="checkbox" class="todo-checkbox" 
                           ${todo.completed ? 'checked' : ''} 
                           onchange="todoApp.toggleTodo(${todo.id})">
                    
                    ${this.editingId === todo.id ? `
                        <input type="text" 
                               class="todo-text editing" 
                               data-edit-id="${todo.id}"
                               value="${todo.text}"
                               onblur="todoApp.saveInlineEdit(${todo.id}, this.value)"
                               onkeypress="if(event.key==='Enter') todoApp.saveInlineEdit(${todo.id}, this.value)"
                               onkeydown="if(event.key==='Escape') todoApp.cancelInlineEdit()"
                               maxlength="100">
                    ` : `
                        <span class="todo-text ${todo.completed ? 'completed' : ''}" 
                              onclick="todoApp.startInlineEdit(${todo.id})"
                              title="클릭해서 수정하기">${todo.text}</span>
                    `}
                    
                    <div class="todo-actions">
                        <button class="edit-btn" 
                                onclick="todoApp.startInlineEdit(${todo.id})" 
                                title="수정">
                            ✏️
                        </button>
                        <button class="delete-btn" 
                                onclick="todoApp.deleteTodo(${todo.id})" 
                                title="삭제">
                            ✕
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// 앱 초기화
const todoApp = new TodoApp();

// 샘플 데이터 추가 (선택사항)

todoApp.toggleTodo(todoApp.todos[0].id); // 첫 번째 항목 완료 처리