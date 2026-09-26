function handleReset(event) {
            event.preventDefault();
            clearErrors();

            const emailInput = document.getElementById('emailInput');
            const errorMsg = document.getElementById('errorMsg');
            const submitBtn = document.querySelector('input[type="submit"]');

            const email = emailInput.value.trim();

            // 验证邮箱
            if (!email) {
                showError(emailInput, 'Please enter your email address.');
                return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError(emailInput, 'Please enter a valid email address.');
                return false;
            }

            // 模拟发送重置邮件
            submitBtn.value = 'sending...';
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'wait';
            errorMsg.textContent = '';
            errorMsg.style.color = '#333';

            setTimeout(function() {
                submitBtn.value = 'reset pin';
                submitBtn.disabled = false;
                submitBtn.style.cursor = 'pointer';
                errorMsg.textContent = '✓ A reset link has been sent to ' + email + '. Please check your inbox.';
                errorMsg.style.color = '#006600';
                emailInput.value = '';
                console.log('Password reset email sent to:', email);
            }, 1500);

            return false;
        }

        function showError(inputElement, message) {
            inputElement.classList.add('error');
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.textContent = '⚠ ' + message;
            errorMsg.style.color = '#cc0000';
            inputElement.focus();
            setTimeout(function() {
                inputElement.classList.remove('error');
            }, 4000);
        }

        function clearErrors() {
            const emailInput = document.getElementById('emailInput');
            emailInput.classList.remove('error');
            document.getElementById('errorMsg').textContent = '';
        }

        // 输入时清除错误
        document.getElementById('emailInput').addEventListener('input', function() {
            this.classList.remove('error');
            if (!this.value.trim()) {
                document.getElementById('errorMsg').textContent = '';
            } else {
                const err = document.getElementById('errorMsg');
                if (err.style.color === 'rgb(204, 0, 0)') {
                    err.textContent = '';
                }
            }
        });

        // 回车键提交
        document.getElementById('emailInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('forgotForm').dispatchEvent(new Event('submit', { cancelable: true }));
            }
        });

        console.log(':: EFO Forgot PIN System Ready ::');
