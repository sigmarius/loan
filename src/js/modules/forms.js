export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка',
            success: 'Сообщение отправлено!',
            failure: 'Что-то пошло не так :('
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    validateEmailInputs() {
        const emailInputs = document.querySelectorAll('[type="email"]');

        emailInputs.forEach(item => {
            item.addEventListener('keypress', (evt) => {
                // разрешаем англ.буквы, цифры, точку и @
                if (evt.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    evt.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (position, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(position, position);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', position);
                range.moveStart('character', position);
                range.select();
            }
        };

        function createMask(evt) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                // глобально (g) заменяет все, что не цифры на пустую строку
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            // не даст пользователю удалить штатные элементы маски +, 1 и др, заданные в matrix    
            if (def.length >= val.length) {
                val = def;
            }

            // проверяем, соответствует ли каждый символ матрицы (/./g) ключам matrixKey
            this.value = matrix.replace(/./g, function (matrixKey) {
                return /[_\d]/.test(matrixKey) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : matrixKey;
            });

            if (evt.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(item => {
            item.addEventListener('input', createMask);
            item.addEventListener('focus', createMask);
            item.addEventListener('blur', createMask);
        });

    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    init() {
        this.validateEmailInputs();
        this.initMask();
        
        this.forms.forEach(item => {
            item.addEventListener('submit', (evt) => {
                evt.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}
