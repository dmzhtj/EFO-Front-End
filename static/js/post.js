// 动态字段控制
        function toggleContentFields() {
            const type = document.getElementById('postType').value;
            // 隐藏所有内容相关行
            ['text','image','video','audio'].forEach(t => {
                if (t === 'text') {
                    document.getElementById('textFieldRow').style.display = 'none';
                    document.getElementById('textFieldTextarea').style.display = 'none';
                } else {
                    document.getElementById(t+'FieldRow').style.display = 'none';
                    document.getElementById(t+'FieldInput').style.display = 'none';
                    document.getElementById(t+'DescRow').style.display = 'none';
                    document.getElementById(t+'DescInput').style.display = 'none';
                }
            });
            // 显示当前类型相关行
            if (type === 'text') {
                document.getElementById('textFieldRow').style.display = '';
                document.getElementById('textFieldTextarea').style.display = '';
            } else if (type) {
                document.getElementById(type+'FieldRow').style.display = '';
                document.getElementById(type+'FieldInput').style.display = '';
                document.getElementById(type+'DescRow').style.display = '';
                document.getElementById(type+'DescInput').style.display = '';
            }
            clearError();
        }

        // 图片预览
        document.getElementById('imageFile').addEventListener('change', function(e) {
            const file = e.target.files[0];
            const previewContainer = document.getElementById('imagePreviewContainer');
            const previewImg = document.getElementById('imagePreview');
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = ev => {
                    previewImg.src = ev.target.result;
                    previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                previewContainer.style.display = 'none';
                previewImg.src = '';
                if (file) {
                    showError('Please select a valid image file.');
                    this.value = '';
                }
            }
        });

        // 视频/音频文件名
        document.getElementById('videoFile').addEventListener('change', function(e) {
            document.getElementById('videoFileName').textContent = e.target.files[0]?.name || '';
        });
        document.getElementById('audioFile').addEventListener('change', function(e) {
            document.getElementById('audioFileName').textContent = e.target.files[0]?.name || '';
        });

        function showError(msg) {
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.textContent = '⚠ ' + msg;
            errorMsg.style.color = '#cc0000';
        }

        function clearError() {
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.textContent = '';
        }

        // 初始状态
        toggleContentFields();
