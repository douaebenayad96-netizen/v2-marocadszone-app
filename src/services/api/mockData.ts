import { TJobOffer, TJobOfferResponse } from '../types/jobOffer'

export const mockJobOffers: TJobOffer[] = [
  {
    id: 1,
    title: "Experienced Plumber Needed in Casablanca",
    description: "We are seeking an experienced plumber to join our growing team in Casablanca. The ideal candidate will have at least 3 years of experience in residential and commercial plumbing installations and repairs.\n\nResponsibilities:\n- Install, repair and maintain plumbing systems and fixtures\n- Diagnose and troubleshoot plumbing issues\n- Provide excellent customer service\n- Maintain a clean and safe work environment\n\nRequirements:\n- 3+ years of experience in plumbing\n- Knowledge of local building codes and regulations\n- Valid driver's license\n- Strong problem-solving skills\n- Excellent communication abilities\n\nWe offer competitive compensation and benefits. To apply, please contact us through the link below.",
    type: "private",
    city: {
      id: 1,
      name: "Casablanca"
    },
    redirect_to: "https://careers.plumbing-services-casa.ma/apply",
    images: [
      {
        id: 14,
        url: "http://127.0.0.1:8000/127.0.0.1/storage/14/photo.png",
        mime_type: "image/jpeg"
      }
    ],
    created_at: "2025-06-03 16:48:02",
    updated_at: "2025-06-13 09:32:35"
  },
  {
    id: 2,
    title: "Software Developer - Full Stack",
    description: "Join our innovative tech team as a Full Stack Developer. We're looking for a passionate developer with experience in modern web technologies.\n\nWhat you'll do:\n- Develop and maintain web applications\n- Work with React, Node.js, and databases\n- Collaborate with designers and product managers\n- Write clean, maintainable code\n\nRequirements:\n- 2+ years of experience in web development\n- Proficiency in JavaScript, React, Node.js\n- Experience with databases (MySQL, MongoDB)\n- Strong problem-solving skills\n- Team player with good communication skills",
    type: "private",
    city: {
      id: 2,
      name: "Rabat"
    },
    redirect_to: "https://careers.techcompany.ma/developer",
    images: [
      {
        id: 15,
        url: "/src/assets/img/Empty-bro.svg",
        mime_type: "image/svg+xml"
      }
    ],
    created_at: "2025-06-10 10:30:00",
    updated_at: "2025-06-15 14:20:00"
  },
  {
    id: 3,
    title: "Marketing Manager - Public Sector",
    description: "The Ministry of Tourism is seeking a Marketing Manager to lead our digital marketing initiatives.\n\nResponsibilities:\n- Develop and execute marketing strategies\n- Manage social media campaigns\n- Analyze market trends and consumer behavior\n- Coordinate with external agencies\n- Prepare marketing reports and presentations\n\nQualifications:\n- Bachelor's degree in Marketing or related field\n- 5+ years of marketing experience\n- Experience in public sector preferred\n- Strong analytical and communication skills\n- Fluency in Arabic, French, and English",
    type: "public",    city: {
      id: 3,
      name: "Fès"
    },
    redirect_to: "https://gov.ma/careers/marketing-manager",
    images: [],
    created_at: "2025-06-12 09:15:00",
    updated_at: "2025-06-16 11:45:00"
  },
  {
    id: 4,
    title: "Électricien - Urgences 24h/24",
    description: "Société de maintenance électrique recherche un électricien expérimenté pour interventions d'urgence.\n\nMissions:\n- Interventions électriques d'urgence\n- Maintenance préventive et curative\n- Dépannage résidentiel et commercial\n- Respect des normes de sécurité\n\nProfil recherché:\n- Diplôme en électricité\n- 3 ans d'expérience minimum\n- Permis de conduire obligatoire\n- Disponibilité pour astreintes\n- Sens du service client",
    type: "private",
    city: {
      id: 4,
      name: "Marrakech"
    },
    redirect_to: "https://electro-services.ma/candidature",
    images: [
      {
        id: 16,
        url: "/src/assets/img/Electrician-bro.svg",
        mime_type: "image/svg+xml"
      }
    ],
    created_at: "2025-06-14 14:00:00",
    updated_at: "2025-06-18 16:30:00"
  },
  {
    id: 5,
    title: "Enseignant de Mathématiques - Collège Public",
    description: "Le Ministère de l'Éducation Nationale recrute un enseignant de mathématiques pour un collège public.\n\nResponsabilités:\n- Enseigner les mathématiques aux élèves du collège\n- Préparer les cours et évaluations\n- Participer aux conseils de classe\n- Suivre la progression des élèves\n- Participer aux activités pédagogiques\n\nRequis:\n- Licence en Mathématiques ou équivalent\n- Concours de recrutement validé\n- Maîtrise des méthodes pédagogiques\n- Patience et pédagogie\n- Maîtrise de l'arabe et du français",
    type: "public",
    city: {
      id: 5,
      name: "Agadir"
    },
    redirect_to: "https://men.gov.ma/concours/enseignant",
    images: [],
    created_at: "2025-06-15 08:30:00",
    updated_at: "2025-06-20 10:15:00"
  }
]

export const createMockJobOfferResponse = (data: TJobOffer[] = mockJobOffers): TJobOfferResponse => ({
  data,
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: data.length
})
