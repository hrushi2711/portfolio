document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('portfolio-theme', 'light');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      localStorage.setItem('portfolio-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  });

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      populatePortfolio(data);
      // Trigger progress bars animation after a short delay
      setTimeout(() => {
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
      }, 500);
      setupCollapsibles();
    })
    .catch(error => {
      console.error('Error fetching the portfolio data:', error);
      document.getElementById('name').textContent = "Error loading data.json";
    });

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

function setupCollapsibles() {
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.collapsible-icon');
      if (content.classList.contains('open')) {
        content.classList.remove('open');
        if (icon) icon.classList.remove('open');
      } else {
        content.classList.add('open');
        if (icon) icon.classList.add('open');
      }
    });
  });
}

function populatePortfolio(data) {
  document.title = `${data.personal.name} | Portfolio`;

  // Profile Photo
  const profilePhotoContainer = document.getElementById('profile-photo-container');
  const profilePhoto = document.getElementById('profile-photo');
  if (data.settings && data.settings.profilePhoto && data.settings.profilePhoto.enabled && data.settings.profilePhoto.url) {
    profilePhoto.src = data.settings.profilePhoto.url;
    profilePhotoContainer.classList.remove('hidden');
  }

  // Personal Info
  document.getElementById('name').textContent = data.personal.name;
  document.getElementById('roles').textContent = data.personal.roles.join('  |  ');
  document.getElementById('about-me').textContent = data.about;

  // Opportunities Badge
  const oppBadge = document.getElementById('opportunities-badge');
  if (oppBadge && data.settings && data.settings.seekingOpportunities) {
    oppBadge.innerHTML = `<span class="status-active" style="margin-left: 0; padding: 8px 16px; font-size: 0.95rem;"><span class="blink-dot"></span> Actively Seeking New Opportunities</span>`;
    oppBadge.classList.remove('hidden');
  }

  // Contact Info & Resume Button
  const navResumeBtn = document.getElementById('nav-resume-btn');
  if (navResumeBtn && data.personal.resume) {
    navResumeBtn.href = data.personal.resume;
    navResumeBtn.classList.remove('hidden');
  }

  const contactContainer = document.getElementById('contact-info');
  if (contactContainer) contactContainer.innerHTML = '';

  if (data.personal.location) {
    contactContainer.insertAdjacentHTML('beforeend', `<span class="contact-link"><i class="fa-solid fa-location-dot"></i><span>${data.personal.location}</span></span>`);
  }
  if (data.personal.email) {
    contactContainer.insertAdjacentHTML('beforeend', `
      <a href="mailto:${data.personal.email}" class="contact-link" style="padding-right: 12px; gap: 8px;">
        <i class="fa-solid fa-envelope"></i>
        <span>${data.personal.email}</span>
        <div class="copy-btn-inner" onclick="event.preventDefault(); copyToClipboard('${data.personal.email}', this)" title="Copy Email">
          <i class="fa-regular fa-copy"></i>
        </div>
      </a>
    `);
  }
  if (data.personal.phone) {
    contactContainer.insertAdjacentHTML('beforeend', `
      <a href="tel:${data.personal.phone}" class="contact-link" style="padding-right: 12px; gap: 8px;">
        <i class="fa-solid fa-phone"></i>
        <span>${data.personal.phone}</span>
        <div class="copy-btn-inner" onclick="event.preventDefault(); copyToClipboard('${data.personal.phone}', this)" title="Copy Phone">
          <i class="fa-regular fa-copy"></i>
        </div>
      </a>
    `);
  }

  if (data.personal.linkedin || data.personal.github) {
    const socialRow = document.createElement('div');
    socialRow.style.display = 'flex';
    socialRow.style.gap = '10px';

    if (data.personal.linkedin) {
      socialRow.insertAdjacentHTML('beforeend', `<a href="${data.personal.linkedin}" class="contact-link" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20" height="20" alt="LinkedIn"><span>LinkedIn</span></a>`);
    }
    if (data.personal.github) {
      socialRow.insertAdjacentHTML('beforeend', `<a href="${data.personal.github}" class="contact-link" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="20" height="20" alt="GitHub" style="filter: invert(var(--icon-invert));"><span>GitHub</span></a>`);
    }
    contactContainer.appendChild(socialRow);
  }

  // Define contacts array for bottom section use
  const validContacts = [
    { icon: 'fa-envelope', text: data.personal.email, href: `mailto:${data.personal.email}` },
    { icon: 'fa-phone', text: data.personal.phone, href: `tel:${data.personal.phone}` },
    { icon: 'fa-linkedin', text: 'LinkedIn', href: data.personal.linkedin, target: '_blank' },
    { icon: 'fa-github', text: 'GitHub', href: data.personal.github, target: '_blank' }
  ].filter(c => c.text !== undefined && c.href !== undefined);

  // Contact Bottom Section
  const contactBtn = document.getElementById('contact-email-btn');
  if (contactBtn && data.personal.email) {
    contactBtn.href = `mailto:${data.personal.email}`;
  }

  const bottomSocialLinks = document.getElementById('bottom-social-links');
  if (bottomSocialLinks) {
    bottomSocialLinks.innerHTML = '';
    validContacts.forEach(contact => {
      // Create social links excluding simple text like location
      if (contact.href && contact.icon !== 'fa-location-dot') {
        const a = document.createElement('a');
        a.href = contact.href;
        a.className = 'social-icon';
        if (contact.target) a.target = contact.target;
        if (contact.download) a.download = '';
        
        if (contact.text === 'LinkedIn') {
            a.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" height="24" alt="LinkedIn">`;
        } else if (contact.text === 'GitHub') {
            a.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" height="24" alt="GitHub" style="filter: invert(var(--icon-invert, 0));">`;
        } else {
            a.innerHTML = `<i class="${contact.text === 'LinkedIn' || contact.text === 'GitHub' ? 'fa-brands' : 'fa-solid'} ${contact.icon}"></i>`;
        }
        
        a.title = contact.text;
        bottomSocialLinks.appendChild(a);
      }
    });
  }

  // --- Experience ---
  const expContainer = document.getElementById('experience-container');
  data.experience.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    let tagsHtml = '';
    if (exp.techStack && exp.techStack.length > 0) {
      tagsHtml = `
        <div class="tags-container">
          ${exp.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      `;
    }

    let html = `
      <div class="timeline-header">
        <div>
          <h4 class="timeline-title">${exp.role}</h4>
          <h5 class="timeline-subtitle">${exp.company}</h5>
        </div>
        <div class="timeline-period">${exp.period}</div>
      </div>
      <div class="timeline-meta"><i class="fas fa-location-dot"></i> ${exp.location}</div>
      ${tagsHtml}
      <div class="timeline-content">
        <ul>
          ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `;

    item.innerHTML = html;
    expContainer.appendChild(item);
  });

  // --- Projects ---
  const projectsContainer = document.getElementById('projects-container');
  if (data.projects && data.projects.length > 0) {
    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      let activeBadge = project.isActive ? `<span class="status-active"><span class="blink-dot"></span> Active</span>` : '';
      let tagsHtml = project.techStack ? `<div class="tags-container" style="margin: 0 0 1.2rem 0; gap: 6px;">${project.techStack.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : '';
      let linkHtml = project.link ? `<a href="${project.link}" target="_blank" class="contact-link" style="padding: 6px 18px; font-size: 0.9rem; align-self: flex-start; justify-content: center; gap: 8px;">View Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : '';

      card.innerHTML = `
        <div class="project-title" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-bottom: 0.8rem;">
          <span style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${project.name}</span>
          ${activeBadge}
        </div>
        ${tagsHtml}
        <p class="project-desc" style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; flex-grow: 1;">${project.description || ''}</p>
        ${linkHtml}
      `;
      projectsContainer.appendChild(card);
    });
  } else {
    const projSect = document.getElementById('projects-section');
    if (projSect) projSect.style.display = 'none';
  }

  // --- Education ---
  const eduContainer = document.getElementById('education-container');
  data.education.forEach(edu => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    item.innerHTML = `
      <div class="timeline-header collapsible-header" style="flex-direction: column; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div>
            <h4 class="timeline-title">${edu.degree}</h4>
            <h5 class="timeline-subtitle">${edu.institution}</h5>
          </div>
          <i class="fas fa-chevron-down collapsible-icon"></i>
        </div>
        <div class="timeline-period aligned-below" style="width: 100%;">${edu.period}</div>
      </div>
      <div class="timeline-content collapsible-content" style="margin-top: 1rem;">
        <p>${edu.details}</p>
      </div>
    `;
    eduContainer.appendChild(item);
  });

  // --- Skills ---
  const getSkillIcon = (name) => {
    const iconMap = {
      "Core Java": "devicon-java-plain colored",
      "Spring MVC": "devicon-spring-original colored",
      "Spring Boot": "devicon-spring-original colored",
      "Scala": "devicon-scala-plain colored",
      "Apache Spark": "devicon-apache-plain colored",
      "React": "devicon-react-original colored",
      "HTML": "devicon-html5-plain colored",
      "CSS": "devicon-css3-plain colored",
      "JavaScript": "devicon-javascript-plain colored",
      "Oracle (PL/SQL)": "devicon-oracle-original colored",
      "MySQL": "devicon-mysql-plain colored",
      "PostgreSQL": "devicon-postgresql-plain colored",
      "Cassandra": "devicon-apache-plain colored",
      "Git": "devicon-git-plain colored",
      "Bitbucket": "devicon-bitbucket-original colored",
      "GitLab": "devicon-gitlab-plain colored",
      "SVN": "fas fa-code-branch",
      "Kafka": "devicon-apachekafka-original colored",
      "AWS": "devicon-amazonwebservices-plain-wordmark colored",
      "Kubernetes": "devicon-kubernetes-plain colored",
      "OpenShift": "devicon-redhat-plain colored"
    };
    return iconMap[name] || "fas fa-laptop-code";
  };

  const skillsContainer = document.getElementById('skills-container');
  if (data.skills) {
    data.skills.forEach(skillCat => {
      const div = document.createElement('div');
      div.className = 'skill-category card collapsible-container';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'collapsible-header';
      headerDiv.style.display = 'flex';
      headerDiv.style.justifyContent = 'space-between';
      headerDiv.style.alignItems = 'center';
      headerDiv.style.cursor = 'pointer';

      const h4 = document.createElement('h4');
      h4.textContent = skillCat.category;
      h4.style.marginBottom = '0';
      h4.style.color = 'var(--accent-color)';
      h4.style.fontSize = '1.2rem';

      const icon = document.createElement('i');
      icon.className = 'fas fa-chevron-down collapsible-icon';
      icon.style.transition = 'transform 0.3s ease';

      headerDiv.appendChild(h4);
      headerDiv.appendChild(icon);
      div.appendChild(headerDiv);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'collapsible-content open';
      contentDiv.style.marginTop = '1.5rem';

      skillCat.items.forEach(item => {
        const isObj = typeof item === 'object';
        const name = isObj ? item.name : item;
        const level = isObj && item.level ? item.level : 50;

        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item-container skill-item';
        skillDiv.style.marginBottom = '1.2rem';
        skillDiv.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: flex-start; gap: 12px; margin-bottom: 8px;">
            <i class="${getSkillIcon(name)}" style="font-size: 1.4rem; width: 24px; text-align: center;"></i>
            <span class="skill-name" style="font-weight: 600; color: var(--text-primary);">${name}</span>
          </div>
          <div class="progress-bar-bg skill-bar-bg" style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; border: 1px solid var(--glass-border);">
            <div class="progress-bar-fill skill-bar-fill" data-width="${level}%" style="height: 100%; width: 0%; background: linear-gradient(90deg, var(--accent-color), var(--accent-secondary)); border-radius: 4px; transition: width 1s ease-out;"></div>
          </div>
        `;
        contentDiv.appendChild(skillDiv);
      });

      div.appendChild(contentDiv);
      skillsContainer.appendChild(div);
    });
  }

  // --- Achievements ---
  const achContainer = document.getElementById('achievements-container');
  if (data.achievements && data.achievements.length > 0) {
    const achUl = document.createElement('ul');
    data.achievements.forEach(ach => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="item-title" style="font-weight: 500; font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">${ach}</span>`;
      achUl.appendChild(li);
    });
    achContainer.appendChild(achUl);
  } else {
    document.getElementById('achievements-section').style.display = 'none';
  }

  // --- Awards ---
  const awardsContainer = document.getElementById('awards-container');
  if (data.awards && data.awards.length > 0) {
    const awardsUl = document.createElement('ul');
    data.awards.forEach(award => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="item-title">${award.title}</span>
        <span class="item-meta">${award.issuer} • ${award.year}</span>
      `;
      awardsUl.appendChild(li);
    });
    awardsContainer.appendChild(awardsUl);
  } else {
    document.getElementById('awards-section').style.display = 'none';
  }

  // --- Certificates ---
  const certContainer = document.getElementById('certificates-container');
  if (data.certificates && data.certificates.length > 0) {
    const certUl = document.createElement('ul');
    data.certificates.forEach(cert => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="item-title">${cert.title}</span>
        <span class="item-meta">${cert.issuer} • ${cert.period}</span>
      `;
      certUl.appendChild(li);
    });
    certContainer.appendChild(certUl);
  } else {
    document.getElementById('certificates-section').style.display = 'none';
  }

  // --- Languages ---
  const langContainer = document.getElementById('languages-container');
  data.languages.forEach(lang => {
    const tag = document.createElement('div');
    tag.className = 'simple-tag';
    tag.innerHTML = `<strong>${lang.name}</strong> <span>${lang.proficiency}</span>`;
    langContainer.appendChild(tag);
  });

  // --- Interests ---
  const intContainer = document.getElementById('interests-container');
  if (intContainer) {
    data.interests.forEach(interest => {
      const tag = document.createElement('div');
      tag.className = 'simple-tag';
      tag.textContent = interest;
      intContainer.appendChild(tag);
    });
  }
}

window.copyToClipboard = function (text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnElement) {
      const icon = btnElement.querySelector('i');
      if (icon) {
        const originalClass = icon.className;
        icon.className = 'fa-solid fa-check';
        setTimeout(() => {
          icon.className = originalClass;
        }, 2000);
      }
    }
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};
