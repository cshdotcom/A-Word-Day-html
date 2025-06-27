// 模拟每日一文接口调用
function fetchPoem() {
    fetch('/api/poems')
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                const latestPoem = data.data[data.data.length - 1];
                const poemContainer = document.getElementById('poem-container');
                poemContainer.innerHTML = `
                    <h2>${latestPoem.title}</h2>
                    <p>${latestPoem.author}</p>
                    <pre>${latestPoem.content}</pre>
                `;
            }
        })
        .catch(error => {
            console.error('获取每日一文失败:', error);
        });
}

// 模拟广告接口调用
function fetchAd() {
    fetch('/api/ads')
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                const latestAd = data.data[data.data.length - 1];
                const adContainer = document.getElementById('ad-container');
                adContainer.innerHTML = `
                    <a href="${latestAd.link}">
                        <img src="${latestAd.image}" alt="${latestAd.alt}">
                    </a>
                `;
            }
        })
        .catch(error => {
            console.error('获取广告失败:', error);
        });
}

// 显示后台管理面板
function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.style.display = 'block';
}

// 登录函数
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('登录失败:', error);
    });
}

// 获取每日一文列表
function listPoems() {
    fetch('/api/poems')
        .then(response => response.json())
        .then(data => {
            console.log('每日一文列表:', data.data);
            alert('每日一文列表已打印到控制台');
        })
        .catch(error => {
            console.error('获取每日一文列表失败:', error);
        });
}

// 添加每日一文
function addPoem() {
    document.getElementById('poem-form').style.display = 'block';
}

function submitPoem() {
    const title = document.getElementById('poem-title').value;
    const author = document.getElementById('poem-author').value;
    const content = document.getElementById('poem-content').value;

    fetch('/api/poems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            author,
            content
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('添加成功');
            document.getElementById('poem-form').style.display = 'none';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('添加每日一文失败:', error);
    });
}

// 获取广告列表
function listAds() {
    fetch('/api/ads')
        .then(response => response.json())
        .then(data => {
            console.log('广告列表:', data.data);
            alert('广告列表已打印到控制台');
        })
        .catch(error => {
            console.error('获取广告列表失败:', error);
        });
}

// 添加广告
function addAd() {
    document.getElementById('ad-form').style.display = 'block';
}

function submitAd() {
    const link = document.getElementById('ad-link').value;
    const image = document.getElementById('ad-image').value;
    const alt = document.getElementById('ad-alt').value;

    fetch('/api/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link,
            image,
            alt
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('添加成功');
            document.getElementById('ad-form').style.display = 'none';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('添加广告失败:', error);
    });
}

// 页面加载完成后调用函数
window.onload = function() {
    fetchPoem();
    fetchAd();
    
    document.getElementById('admin-login-btn').addEventListener('click', showAdminPanel);
    document.getElementById('submit-login').addEventListener('click', login);
    document.getElementById('list-poems').addEventListener('click', listPoems);
    document.getElementById('add-poem').addEventListener('click', addPoem);
    document.getElementById('submit-poem').addEventListener('click', submitPoem);
    document.getElementById('list-ads').addEventListener('click', listAds);
    document.getElementById('add-ad').addEventListener('click', addAd);
    document.getElementById('submit-ad').addEventListener('click', submitAd);
};