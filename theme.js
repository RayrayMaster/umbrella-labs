(function () {
	// Aplica/remova o atributo data-theme imediatamente (evita flash)
	const root = document.documentElement;
	function setThemeAttr(theme) {
		if (theme === 'dark') root.setAttribute('data-theme', 'dark');
		else root.removeAttribute('data-theme');
	}

	// Determina tema inicial (localStorage > preferência do sistema > light)
	const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const initial = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
	setThemeAttr(initial);

	// Função para atualizar a UI do toggle (requere elementos existentes)
	function updateToggleUI(theme) {
		const toggle = document.getElementById('themeToggle');
		const icon = document.getElementById('themeIcon');
		const label = document.getElementById('themeLabel');
		if (toggle) toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
		if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
		if (label) label.textContent = theme === 'dark' ? 'Claro' : 'Escuro';
	}

	// Inicializa após DOM pronto: sincroniza UI e liga o evento do botão
	function init() {
		const cur = (localStorage.getItem('theme') === 'dark' || localStorage.getItem('theme') === 'light')
			? localStorage.getItem('theme')
			: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

		updateToggleUI(cur);

		const toggle = document.getElementById('themeToggle');
		if (toggle) {
			toggle.addEventListener('click', function () {
				const isDark = root.getAttribute('data-theme') === 'dark';
				const next = isDark ? 'light' : 'dark';
				setThemeAttr(next);
				updateToggleUI(next);
				localStorage.setItem('theme', next);
			});
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
