import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../components/shared/page-header.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink],
  template: `
    <div>
      <app-page-header
        title="About FITTER-EU"
        subtitle="Fair, Inclusive Twin Transition for European Regions – advancing social justice to reduce inequality in Europe's green and digital transitions."
        breadcrumb="About"/>

      <!-- Mission -->
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 class="text-2xl md:text-3xl font-semibold text-[#2D3436] mb-6">Our Mission</h2>
              <div class="space-y-4 text-[#5A6B5E] leading-relaxed">
                <p>Digi Green TT is a cluster group focused on supporting Europe's twin transition—green and digital—
                  with an underlying philosophy to leave no one behind. Our work centres on identifying, understanding,
                  and mitigating the social inequalities that can arise from rapid technological and environmental change.</p>
                <p>Initiated in the FITTER-EU Horizon Europe project (Grant Agreement No. 101132546) and delivered through
                  TFC Research and Innovation Limited (Ireland), the Digi Green TT group brings together a series of European
                  projects in the Twin-Transition space with a collective aim to cross-fertilize and transcend individual
                  project experiences for the wider good of the communities served.</p>
                <p>Through the Sister Project Engagement initiative, we connect with fellow Horizon Europe projects to
                  amplify impact, share knowledge, and collaborate on joint activities that advance fairness and inclusion
                  across the European Research Area.</p>
              </div>
            </div>
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                   alt="Team collaboration on policy development"
                   class="rounded-2xl shadow-lg w-full h-[400px] object-cover"/>
              <div class="absolute -bottom-6 -left-6 bg-[#7C9082] text-white p-6 rounded-xl shadow-lg max-w-xs hidden lg:block">
                <p class="text-sm font-medium">Grant Agreement No.</p>
                <p class="text-2xl font-semibold">101132546</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How We Work -->
      <section class="bg-white py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl md:text-3xl font-semibold text-[#2D3436] mb-12 text-center">How We Work</h2>
          <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            @for (item of howWeWork(); track item.title) {
              <div class="text-center">
                <div class="w-12 h-12 rounded-xl bg-[#7C9082]/10 flex items-center justify-center mx-auto mb-4">
                  <svg class="h-6 w-6 text-[#7C9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="item.icon"/>
                  </svg>
                </div>
                <h3 class="text-sm font-semibold text-[#2D3436] mb-2">{{ item.title }}</h3>
                <p class="text-xs text-[#5A6B5E] leading-relaxed">{{ item.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Engagement Approach -->
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-br from-[#7C9082] to-[#5A6B5E] rounded-2xl p-8 md:p-12 lg:p-16">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 class="text-2xl md:text-3xl font-semibold text-white mb-6">Our Engagement Approach</h2>
                <p class="text-white/90 leading-relaxed mb-6">
                  We believe in the power of collaborative knowledge creation. Through structured engagement activities,
                  we bring together diverse perspectives to shape fair transition policies and practices.
                </p>
                <ul class="space-y-3 text-white/90">
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#C67B5C] mt-2 shrink-0"></span>
                    <span><strong>Roundtables</strong> – Structured dialogues with policy makers and stakeholders</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#C67B5C] mt-2 shrink-0"></span>
                    <span><strong>Workshops</strong> – Hands-on sessions to co-develop solutions and tools</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#C67B5C] mt-2 shrink-0"></span>
                    <span><strong>Hackathons</strong> – Intensive innovation sprints with cross-project teams</span>
                  </li>
                </ul>
              </div>
              <div class="text-center lg:text-right">
                <a routerLink="/Collaborate"
                   class="inline-flex items-center gap-2 bg-white text-[#7C9082] hover:bg-white/90 px-8 py-3 rounded-lg text-base font-medium transition-colors">
                  Collaborate With Us
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class AboutComponent {
  readonly howWeWork = signal([
    {
      title: 'Co-creation',
      description: 'Engaging stakeholders from policy, industry, and civil society.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      title: 'Predictive Decision Support',
      description: 'Evidence-based tools to anticipate transition impacts.',
      icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
    },
    {
      title: 'Scenario Simulation',
      description: 'Modelling transition pathways for fair outcomes.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Better Practice Guides',
      description: 'Actionable guidance for addressing negative impacts.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      title: 'Gamified Platform',
      description: 'Interactive tools to engage diverse audiences.',
      icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ]);
}

