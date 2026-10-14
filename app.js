"use strict";
const portfolioConfig = {
    name: 'Alex Morgan',
    email: 'hello@yourdomain.com',
    location: 'YOUR LOCATION / REMOTE',
    title: 'Cybersecurity Engineer',
};
const projectCases = {
    sentinel: {
        number: '001',
        category: '// DETECTION ENGINEERING',
        title: 'Sentinel // Log Pipeline',
        description: 'Sample case study: a concept for translating raw security events into useful signals for investigation.',
        mission: 'Design a centralized security-log workflow that highlights high-priority authentication and network events without overwhelming analysts.',
        approach: 'Sketch a collection and parsing layer, normalize event fields, enrich relevant records, and propose detection rules mapped to observable behavior. Validate rules against benign and suspicious example events.',
        stack: 'Python · Log parsing · SIEM concepts · Detection rules · MITRE ATT&CK',
    },
    ghost: {
        number: '002',
        category: '// OFFENSIVE SECURITY',
        title: 'Ghost // Recon Toolkit',
        description: 'Sample case study: an organized reconnaissance workflow for authorized web application assessments.',
        mission: 'Give an authorized tester a consistent way to inventory exposed assets and record leads for deeper manual review.',
        approach: 'Outline modules for subdomain inventory, service discovery, URL collection, and structured reporting. Favor clear evidence, explicit scope, and non-destructive default behavior.',
        stack: 'Python · Nmap · DNS · OSINT · Web security methodology',
    },
    vault: {
        number: '003',
        category: '// CLOUD SECURITY',
        title: 'Vault // Zero Trust Lab',
        description: 'Sample case study: a hands-on lab concept exploring resilient cloud identity and access design.',
        mission: 'Explore how cloud identities, segmented roles, and strong authentication can reduce the impact of credential misuse.',
        approach: 'Model a small cloud environment, separate human and machine identities, apply least-privilege permissions, require MFA where supported, and review audit signals for unusual access.',
        stack: 'Cloud IAM · RBAC · MFA · Access reviews · Zero Trust principles',
    },
};
function byId(id) {
    return document.getElementById(id);
}
function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
}
function setupProfile() {
    setText('[data-person-name]', portfolioConfig.name);
    setText('[data-location]', portfolioConfig.location);
    setText('#year', String(new Date().getFullYear()));
    document.title = `${portfolioConfig.name} — ${portfolioConfig.title}`;
    const emailLink = byId('email-link');
    if (emailLink) {
        const icon = emailLink.querySelector('svg')?.cloneNode(true);
        emailLink.textContent = `${portfolioConfig.email} `;
        if (icon)
            emailLink.append(icon);
        emailLink.href = `mailto:${portfolioConfig.email}`;
    }
}
function setupMobileMenu() {
    const button = byId('menu-toggle');
    const menu = byId('mobile-nav');
    if (!button || !menu)
        return;
    const closeMenu = () => {
        menu.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open navigation menu');
    };
    button.addEventListener('click', () => {
        const isOpening = menu.hidden;
        menu.hidden = !isOpening;
        button.setAttribute('aria-expanded', String(isOpening));
        button.setAttribute('aria-label', isOpening ? 'Close navigation menu' : 'Open navigation menu');
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape')
            closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 990)
            closeMenu();
    });
}
function setupReveal() {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('in-view'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.09, rootMargin: '0px 0px -25px 0px' });
    elements.forEach((element) => observer.observe(element));
}
function setupProjectFilters() {
    const filters = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.project-card[data-category]');
    filters.forEach((filterButton) => {
        filterButton.addEventListener('click', () => {
            const selected = filterButton.dataset.filter ?? 'all';
            filters.forEach((button) => {
                const active = button === filterButton;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', String(active));
            });
            cards.forEach((card) => {
                card.classList.toggle('is-hidden', selected !== 'all' && card.dataset.category !== selected);
            });
        });
    });
}
function setupProjectModal() {
    const dialog = byId('project-dialog');
    if (!dialog)
        return;
    const openCase = (id) => {
        const project = projectCases[id];
        if (!project)
            return;
        setText('#modal-number', project.number);
        setText('#modal-category', project.category);
        setText('#project-dialog-title', project.title);
        setText('#modal-description', project.description);
        setText('#modal-mission', project.mission);
        setText('#modal-approach', project.approach);
        setText('#modal-stack', project.stack);
        dialog.showModal();
    };
    document.querySelectorAll('[data-project]').forEach((button) => {
        button.addEventListener('click', () => openCase(button.dataset.project ?? ''));
    });
    dialog.querySelector('[data-close-project]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog)
            dialog.close();
    });
}
let toastTimeout;
function showToast(message) {
    const toast = byId('toast');
    if (!toast)
        return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    if (toastTimeout !== undefined)
        window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}
async function copyText(value) {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(value);
            return true;
        }
        catch { }
    }
    const temporary = document.createElement('textarea');
    temporary.value = value;
    temporary.setAttribute('readonly', '');
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.append(temporary);
    temporary.select();
    let copied = false;
    try {
        copied = document.execCommand('copy');
    }
    catch {
        copied = false;
    }
    temporary.remove();
    return copied;
}
function setupContact() {
    byId('copy-email')?.addEventListener('click', async () => {
        const copied = await copyText(portfolioConfig.email);
        showToast(copied ? '✓ EMAIL ADDRESS COPIED' : `COPY THIS EMAIL: ${portfolioConfig.email}`);
    });
}
function setupTerminal() {
    const dialog = byId('terminal-dialog');
    const form = byId('terminal-form');
    const input = byId('terminal-input');
    const output = byId('terminal-output');
    if (!dialog || !form || !input || !output)
        return;
    const print = (message, kind = 'normal') => {
        const line = document.createElement('p');
        line.className = `terminal-entry${kind === 'normal' ? '' : ` ${kind}`}`;
        line.textContent = message;
        output.append(line);
        line.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    };
    const openTerminal = () => {
        if (!dialog.open)
            dialog.showModal();
        window.setTimeout(() => input.focus(), 0);
    };
    const closeTerminal = () => dialog.close();
    const commands = {
        help: () => print('AVAILABLE COMMANDS\n  help       List available commands\n  about      About the portfolio owner\n  skills     Show focus areas\n  projects   List sample case studies\n  contact    Show contact address\n  whoami     Current user\n  ls         List portfolio sections\n  clear      Clear terminal output\n  exit       Close terminal'),
        about: () => print(`${portfolioConfig.name} — ${portfolioConfig.title}.\nI think offensively and build defensively.\nUse the website sections for more context.`),
        skills: () => print('> Penetration testing\n> Detection & incident response\n> Cloud security and identity\n> Digital forensics\n> Security automation\n> Threat intelligence'),
        projects: () => print('SAMPLE_CASES/\n  001  Sentinel  — Log Pipeline\n  002  Ghost     — Recon Toolkit\n  003  Vault     — Zero Trust Lab\n\nThese are illustrative project concepts. Replace with your actual work.'),
        contact: () => print(`SECURE CONTACT CHANNEL\n  EMAIL: ${portfolioConfig.email}\n  STATUS: Open to opportunities`),
        whoami: () => print('guest // authorized portfolio visitor'),
        ls: () => print('about/   expertise/   projects/   contact/   README.md'),
        clear: () => { output.textContent = ''; },
        exit: closeTerminal,
        sudo: () => print('Nice try. Principle of least privilege is enabled.', 'error'),
    };
    const runCommand = (raw) => {
        const normalized = raw.trim().toLowerCase();
        if (!normalized)
            return;
        print(`guest@portfolio:~$ ${raw}`, 'command');
        const action = commands[normalized];
        if (action)
            action();
        else
            print(`Command not found: ${raw}. Type "help" to see commands.`, 'error');
    };
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        runCommand(input.value);
        input.value = '';
        input.focus();
    });
    document.querySelectorAll('[data-command]').forEach((button) => {
        button.addEventListener('click', () => { runCommand(button.dataset.command ?? ''); input.focus(); });
    });
    byId('open-terminal')?.addEventListener('click', openTerminal);
    dialog.querySelector('[data-close-terminal]')?.addEventListener('click', closeTerminal);
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog)
            closeTerminal();
    });
    document.addEventListener('keydown', (event) => {
        const target = event.target;
        const typing = target?.matches('input,textarea,select,[contenteditable="true"]') ?? false;
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            if (dialog.open)
                closeTerminal();
            else
                openTerminal();
        }
        else if (event.key === '/' && !typing && !event.altKey && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            openTerminal();
        }
    });
}
function initializePortfolio() {
    setupProfile();
    setupMobileMenu();
    setupReveal();
    setupProjectFilters();
    setupProjectModal();
    setupContact();
    setupTerminal();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
}
else {
    initializePortfolio();
}
