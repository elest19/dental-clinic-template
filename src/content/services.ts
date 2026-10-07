export type CardImage = { src: string; alt: string; focus?: string };
export type ServiceCategory = {
  slug: string;
  name: string;
  description: string;
  order: number;
  /** Optional. When missing, ServiceImage renders its neutral fallback. */ image?: CardImage;
};
export type Service = {
  slug: string;
  name: string;
  categorySlug: string;
  label: string;
  description: string;
  /** Longer form copy shown on the service detail page. */ detail: string;
  startingPrice: number;
  priceNote?: string;
  popular?: boolean;
  /** Optional. When missing, ServiceImage renders its neutral fallback. */ image?: CardImage;
  whatToExpect: string[];
  whoItsFor: string[];
};
/** Copy for the services section heading on the homepage. */
export const serviceSection = {
  index: "02",
  title: "Treatments for everyday dental needs.",
  description:
    "Four categories, from routine check-ups to braces. Every page lists what happens, how long it takes, and the starting price.",
} as const;

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    description:
      "Check-ups, cleanings and everyday care to keep your teeth and gums healthy.",
    order: 1,
    image: {
      src: "/images/services/categories/general-dentistry.jpg",
      alt: "Dentist completing a general oral examination of a patient",
    },
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    description:
      "Whitening, bonding and veneers for changing how your smile looks.",
    order: 2,
    image: {
      src: "/images/services/categories/cosmetic-dentistry.jpg",
      alt: "Patient smiling after a cosmetic dental consultation with her clinician",
    },
  },
  {
    slug: "restorative-dentistry",
    name: "Restorative Dentistry",
    description:
      "Repair or replace damaged and missing teeth so you can chew and smile normally again.",
    order: 3,
    image: {
      src: "/images/services/categories/restorative-dentistry.jpg",
      alt: "Custom dental crown being fitted to a prepared tooth",
    },
  },
  {
    slug: "specialty-services",
    name: "Specialty Services",
    description:
      "Braces, children's care, jaw pain and other needs beyond a routine visit.",
    order: 4,
    image: {
      src: "/images/services/categories/specialty-services.jpg",
      alt: "Dental specialist explaining a detailed treatment plan to a patient",
    },
  },
];
export const services: Service[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    categorySlug: "general-dentistry",
    label: "Core care",
    description:
      "Fillings, repairs and routine care for everyday dental problems.",
    detail:
      "This is where most visits start. We check your teeth and gums, treat small problems like cavities before they get bigger, and explain what's going on in plain language.",
    startingPrice: 800,
    image: {
      src: "/images/services/general-dentistry.jpg",
      alt: "Dentist completing a general oral examination of a patient",
    },
    whatToExpect: [
      "A check of your teeth, gums and bite.",
      "Fillings or small repairs if something needs fixing.",
      "Simple advice on brushing, flossing and what to do between visits.",
    ],
    whoItsFor: [
      "Anyone who needs a regular dentist.",
      "People with a cavity, a worn tooth or mild discomfort.",
      "Families who want one clinic for everyone.",
    ],
  },
  {
    slug: "dental-cleaning",
    name: "Dental Cleaning",
    categorySlug: "general-dentistry",
    label: "Hygiene",
    description:
      "A professional clean that removes the plaque and tartar brushing misses.",
    detail:
      "Even careful brushing leaves some buildup along the gumline. We scrape it off, polish your teeth, and check for signs of gum trouble while we're there. Most people leave with a smoother, fresher-feeling mouth.",
    startingPrice: 1200,
    popular: true,
    image: {
      src: "/images/services/dental-cleaning.jpg",
      alt: "Hygienist performing a professional teeth cleaning with an ultrasonic scaler",
    },
    whatToExpect: [
      "Scaling to remove plaque and hardened tartar.",
      "Polishing to lift surface stains.",
      "A quick check of your gums, with tips if they need more attention.",
    ],
    whoItsFor: [
      "Anyone who hasn't had a clean in the last six months.",
      "People whose gums bleed when they brush.",
      "Coffee and tea drinkers with surface stains.",
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    categorySlug: "cosmetic-dentistry",
    label: "Smile refresh",
    description:
      "Lighten stains from coffee, tea and age, with the strength matched to your teeth.",
    detail:
      "We start by looking at your current shade and how sensitive your teeth are, then pick a whitening strength that makes sense for you. Results vary from person to person, and we'll tell you honestly what to expect before we start.",
    startingPrice: 5000,
    popular: true,
    image: {
      src: "/images/services/teeth-whitening.jpg",
      alt: "Patient receiving a professional teeth whitening treatment",
    },
    whatToExpect: [
      "A shade check and a quick look at sensitivity.",
      "In-chair whitening, usually done in one visit.",
      "Tips for keeping the colour, like what to cut back on afterwards.",
    ],
    whoItsFor: [
      "People with stains from coffee, tea, wine or age.",
      "Anyone getting ready for a wedding, interview or event.",
      "Patients with healthy teeth and gums who want a lighter shade.",
    ],
  },
  {
    slug: "orthodontics-braces",
    name: "Orthodontics (Braces)",
    categorySlug: "specialty-services",
    label: "Smile alignment",
    description:
      "Braces to straighten crowded or crooked teeth and fix your bite.",
    detail:
      "Braces move teeth into better positions over time, which helps with both how they look and how they bite together. We'll map out a plan, explain how long it should take, and see you regularly to make adjustments along the way.",
    startingPrice: 35000,
    popular: true,
    image: {
      src: "/images/services/orthodontics-braces.jpg",
      alt: "Orthodontic braces being fitted and adjusted to straighten teeth",
    },
    whatToExpect: [
      "An exam, X-rays and a talk about what you want to change.",
      "A clear plan with an estimated timeline.",
      "Regular adjustment visits, plus advice on cleaning around braces.",
    ],
    whoItsFor: [
      "Teens and adults with crowded, gapped or crooked teeth.",
      "People with an overbite, underbite or a bite that feels off.",
      "Anyone ready to stick with a treatment that takes a while.",
    ],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    categorySlug: "restorative-dentistry",
    label: "Smile restoration",
    description:
      "A fixed replacement for a missing tooth, anchored in the jawbone.",
    detail:
      "An implant is a small post placed in the jaw that holds a replacement tooth in place. It's the closest thing to a natural tooth, and it doesn't rely on the teeth beside it. Treatment takes a few visits, with healing time in between.",
    startingPrice: 45000,
    priceNote: "per tooth",
    popular: true,
    image: {
      src: "/images/services/dental-implants.jpg",
      alt: "Dental implant fixture being placed into the jawbone during surgery",
    },
    whatToExpect: [
      "X-rays and a check that your jawbone can support an implant.",
      "A short procedure to place the post, then time to heal.",
      "A custom crown fitted on top once the implant has settled.",
    ],
    whoItsFor: [
      "People missing one or more teeth.",
      "Anyone tired of loose dentures or gaps when eating.",
      "Patients with healthy gums who are fine with a longer healing period.",
    ],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    categorySlug: "restorative-dentistry",
    label: "Restorative",
    description:
      "Caps for damaged teeth, and bridges to fill the gap where one is missing.",
    detail:
      "A crown covers a tooth that's cracked, badly worn or heavily filled, so it can keep doing its job. A bridge uses crowns on the neighbouring teeth to hold a replacement across a gap. Both are made to match your bite and the colour of your other teeth.",
    startingPrice: 8000,
    priceNote: "per unit",
    image: {
      src: "/images/services/crowns-and-bridges.jpg",
      alt: "Custom dental crown and bridge being fitted and adjusted",
    },
    whatToExpect: [
      "The tooth is shaped and an impression or scan is taken.",
      "A temporary crown while the final one is made.",
      "A second visit to fit it and check your bite.",
    ],
    whoItsFor: [
      "People with a cracked or weak tooth.",
      "Teeth that have had a large filling or a root canal.",
      "Anyone with a missing tooth who doesn't want an implant.",
    ],
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    categorySlug: "specialty-services",
    label: "Family care",
    description: "Gentle dental care for babies, kids and teens.",
    detail:
      "Kids do better when the first visits are short and calm. We take our time, explain things at their level, and focus on keeping their teeth healthy with cleanings, fluoride and regular check-ups as they grow.",
    startingPrice: 1000,
    image: {
      src: "/images/services/pediatric-dentistry.jpg",
      alt: "Young child sitting comfortably during a paediatric dental checkup",
    },
    whatToExpect: [
      "A relaxed visit where your child gets used to the chair.",
      "A gentle clean and a check of how their teeth are coming in.",
      "Advice for parents on brushing, snacks and thumb sucking.",
    ],
    whoItsFor: [
      "Children from their first tooth through the teen years.",
      "Kids who are nervous about the dentist.",
      "Parents who want a regular check-up schedule for the whole family.",
    ],
  },
  {
    slug: "dental-examinations",
    name: "Dental Examinations",
    categorySlug: "general-dentistry",
    label: "Checkups",
    description: "A regular check-up to catch problems while they're still small.",
    detail:
      "We look over your teeth, gums, bite and the soft tissue in your mouth, and take X-rays when needed. Catching a cavity or gum problem early usually means a simpler, cheaper fix.",
    startingPrice: 500,
    image: {
      src: "/images/services/dental-examinations.jpg",
      alt: "Clinician reviewing dental X-rays with a patient during an examination",
    },
    whatToExpect: [
      "A look at your teeth, gums, tongue and bite.",
      "X-rays if we need a closer look.",
      "A clear summary of what we found and whether anything needs treatment.",
    ],
    whoItsFor: [
      "Anyone due for a check-up, usually every six months.",
      "People with sensitivity, bleeding gums or a new ache.",
      "Patients coming back after a few years away from the dentist.",
    ],
  },
  {
    slug: "emergency-dentistry",
    name: "Emergency Dentistry",
    categorySlug: "general-dentistry",
    label: "Urgent care",
    description:
      "Quick help for toothache, swelling, broken teeth and mouth injuries.",
    detail:
      "If you're in pain, or you've broken or knocked out a tooth, call us as soon as you can. We'll see you quickly, ease the pain, and then tell you what needs to happen next.",
    startingPrice: 1500,
    image: {
      src: "/images/services/emergency-dentistry.jpg",
      alt: "Dentist treating a patient with urgent tooth pain in a clinic chair",
    },
    whatToExpect: [
      "A quick look to find the source of the problem.",
      "Pain relief first, then a plan for fixing the tooth.",
      "Instructions for the next few days and a follow-up visit.",
    ],
    whoItsFor: [
      "Anyone with a bad toothache that won't go away.",
      "Swollen gums or face, or a bad taste that could mean infection.",
      "A broken, chipped or knocked-out tooth.",
    ],
  },
  {
    slug: "dental-sealants",
    name: "Dental Sealants",
    categorySlug: "general-dentistry",
    label: "Prevention",
    description:
      "A thin coating that seals the grooves of back teeth against cavities.",
    detail:
      "The chewing surfaces of back teeth have deep grooves where food and bacteria collect. A sealant fills them in with a thin clear or white layer, so there's less to trap and less to clean. It goes on in minutes and doesn't hurt.",
    startingPrice: 900,
    priceNote: "per tooth",
    image: {
      src: "/images/services/dental-sealants.jpg",
      alt: "Protective sealant being applied to the grooves of a back tooth",
    },
    whatToExpect: [
      "The tooth is cleaned and dried.",
      "The sealant is painted on and hardened with a light.",
      "We check it at your regular visits and touch it up if it wears.",
    ],
    whoItsFor: [
      "Children and teens with new back teeth.",
      "Adults with deep grooves that keep getting cavities.",
      "Anyone who wants an easy way to prevent decay.",
    ],
  },
  {
    slug: "root-canal-therapy",
    name: "Root Canal Therapy",
    categorySlug: "restorative-dentistry",
    label: "Pain relief",
    description:
      "Treatment that clears out a badly infected tooth so you can keep it.",
    detail:
      "When decay or a crack lets bacteria into the inside of a tooth, it can cause severe pain and abscesses. A root canal removes the infected tissue, cleans the inside and seals it up, so the pain stops and the tooth stays. With local anaesthetic, most people say it feels similar to having a filling done.",
    startingPrice: 12000,
    image: {
      src: "/images/services/root-canal-therapy.jpg",
      alt: "Dentist performing root canal therapy on a patient under local anaesthetic",
    },
    whatToExpect: [
      "Local anaesthetic so you're numb before we start.",
      "The infected tissue is removed and the inside of the tooth is cleaned.",
      "The tooth is sealed, and usually needs a crown afterwards.",
    ],
    whoItsFor: [
      "People with a severe toothache or pain when biting.",
      "A tooth that stays sensitive to heat or cold for a long time.",
      "A tooth with deep decay or a crack that has reached the nerve.",
    ],
  },
  {
    slug: "dental-bonding",
    name: "Dental Bonding",
    categorySlug: "cosmetic-dentistry",
    label: "Smile refresh",
    description:
      "A tooth-coloured filling material used to fix small chips and gaps.",
    detail:
      "We shape tooth-coloured resin directly onto your tooth, harden it with a light, and polish it so it blends in. There's usually no drilling, and it often takes just one visit. It works well for small repairs, though it can stain or chip sooner than veneers.",
    startingPrice: 3500,
    image: {
      src: "/images/services/dental-bonding.jpg",
      alt: "Tooth-coloured bonding resin being shaped onto a chipped front tooth",
    },
    whatToExpect: [
      "We pick a resin shade that matches your tooth.",
      "The resin is shaped on the tooth and hardened with a light.",
      "A final polish, then tips on what to avoid biting.",
    ],
    whoItsFor: [
      "A chipped or slightly cracked front tooth.",
      "A small gap you'd like closed.",
      "Anyone who wants a quick, lower-cost fix.",
    ],
  },
  {
    slug: "dental-veneers",
    name: "Dental Veneers",
    categorySlug: "cosmetic-dentistry",
    label: "Smile design",
    description:
      "Thin shells bonded over the front of your teeth to change their colour and shape.",
    detail:
      "A veneer is a thin layer of porcelain or resin that covers the front of a tooth. We use them to hide stains that won't whiten, even out shape or size, and close small gaps. A little enamel is usually removed first, and we'll go over that with you beforehand.",
    startingPrice: 35000,
    priceNote: "per tooth",
    image: {
      src: "/images/services/dental-veneers.jpg",
      alt: "Thin porcelain veneer being placed onto a prepared front tooth",
    },
    whatToExpect: [
      "A talk about what you want your smile to look like.",
      "Light shaping of the teeth, then a scan or impression.",
      "A trial fit so you can check the look before they're bonded on.",
    ],
    whoItsFor: [
      "Teeth that stay stained after whitening.",
      "Teeth that are uneven, chipped, or smaller than you'd like.",
      "People who want several teeth to match.",
    ],
  },
  {
    slug: "tooth-extractions",
    name: "Tooth Extractions",
    categorySlug: "restorative-dentistry",
    label: "Oral surgery",
    description: "Safe removal of a tooth that can't be saved.",
    detail:
      "We only pull a tooth when it can't be repaired, or when keeping it would cause more problems. We numb the area, take the tooth out as gently as we can, and give you clear instructions for the first few days. If you want to replace it afterwards, we'll go through the options.",
    startingPrice: 2500,
    image: {
      src: "/images/services/tooth-extractions.jpg",
      alt: "Dentist carefully extracting a tooth with sterile instruments",
    },
    whatToExpect: [
      "X-rays and a check of the tooth and the bone around it.",
      "Local anaesthetic, then removal.",
      "Written aftercare steps and a check-up to see how it's healing.",
    ],
    whoItsFor: [
      "A tooth with decay or damage too deep to repair.",
      "Wisdom teeth that are painful or stuck.",
      "A tooth that has become loose because of gum disease.",
    ],
  },
  {
    slug: "dentures",
    name: "Dentures",
    categorySlug: "restorative-dentistry",
    label: "Full restoration",
    description:
      "Removable teeth to replace several missing teeth or a full set.",
    detail:
      "Dentures are made from impressions of your mouth so they sit comfortably on your gums. Partial dentures fill a few gaps, and full dentures replace a whole row. They can feel strange for the first few weeks, so we book follow-up visits to adjust the fit.",
    startingPrice: 18000,
    image: {
      src: "/images/services/dentures.jpg",
      alt: "Custom removable denture being fitted and adjusted for a patient",
    },
    whatToExpect: [
      "Impressions and measurements of your mouth.",
      "A trial fit before the final set is made.",
      "Follow-up visits to fix any sore spots as you get used to them.",
    ],
    whoItsFor: [
      "People missing several teeth or a full set.",
      "Anyone who needs teeth taken out and replaced.",
      "Current denture wearers whose set is loose or worn.",
    ],
  },
  {
    slug: "temporomandibular-joint-care",
    name: "TMJ & Facial Pain",
    categorySlug: "specialty-services",
    label: "Jaw health",
    description:
      "Help for jaw pain, clicking, and clenching or grinding at night.",
    detail:
      "Jaw pain often comes from clenching or grinding, sometimes without you knowing it. We check how your jaw moves, feel the muscles around it, and look at your bite. Treatment usually starts simple, like a night guard and a few changes at home.",
    startingPrice: 1800,
    image: {
      src: "/images/services/temporomandibular-joint-care.jpg",
      alt: "Clinician assessing a patient jaw joint for facial pain",
    },
    whatToExpect: [
      "Questions about your symptoms and how often they happen.",
      "A check of your jaw movement and the muscles around it.",
      "A plan that may include a custom night guard and jaw exercises.",
    ],
    whoItsFor: [
      "People whose jaw clicks, aches or locks.",
      "Anyone waking up with headaches or a sore face.",
      "Patients who grind their teeth or have worn teeth.",
    ],
  },
  {
    slug: "sedation-dentistry",
    name: "Sedation Dentistry",
    categorySlug: "specialty-services",
    label: "Comfort",
    description:
      "Options to help you stay relaxed during treatment if you're anxious.",
    detail:
      "Plenty of people dread the dentist, and there's nothing embarrassing about it. Depending on the treatment and how you feel, we can offer anything from a mild relaxant to deeper sedation. We'll go over your health history and agree on the right level before we start.",
    startingPrice: 3500,
    image: {
      src: "/images/services/sedation-dentistry.jpg",
      alt: "Patient relaxed in a dental chair during sedation dentistry",
    },
    whatToExpect: [
      "A talk about your health, medications and what worries you.",
      "Agreement on the type of sedation before the day.",
      "Monitoring during treatment, and instructions for getting home safely.",
    ],
    whoItsFor: [
      "People who are very afraid of dental visits.",
      "Anyone having a long or complicated procedure.",
      "Patients who gag easily or find it hard to stay still.",
    ],
  },
  {
    slug: "retainer-repair",
    name: "Retainer Repair",
    categorySlug: "specialty-services",
    label: "Aftercare",
    description: "Fixes and replacements for broken, loose or lost retainers.",
    detail:
      "Teeth start to drift when you stop wearing a retainer, so it's worth sorting out quickly. We'll check whether your teeth have moved, repair the retainer if we can, and make a new one if we can't.",
    startingPrice: 2800,
    image: {
      src: "/images/services/retainer-repair.jpg",
      alt: "Orthodontic retainer being repaired and refitted to a patient teeth",
    },
    whatToExpect: [
      "A check of whether your teeth have shifted.",
      "A repair, or an impression for a new retainer.",
      "A reminder of how often to wear it and how to clean it.",
    ],
    whoItsFor: [
      "Anyone whose retainer is cracked, loose or doesn't fit.",
      "People who lost theirs.",
      "Patients who finished braces and want to protect the results.",
    ],
  },
];
/** Services belonging to a category, ordered to match the category data. */ export function getServicesByCategory(
  categorySlug: string,
): Service[] {
  return services.filter((service) => service.categorySlug === categorySlug);
}
export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}
export function getServiceBySlug(
  categorySlug: string,
  serviceSlug: string,
): Service | undefined {
  return getServicesByCategory(categorySlug).find(
    (service) => service.slug === serviceSlug,
  );
}
/** Lowest starting price in a category, used for the category cards. */ export function getCategoryStartingPrice(
  categorySlug: string,
): number | undefined {
  const items = getServicesByCategory(categorySlug);
  if (items.length === 0) return undefined;
  return Math.min(...items.map((service) => service.startingPrice));
}
/** Optional "Most popular" row. Remove this row from the page to hide it. */ export function getPopularServices(): Service[] {
  return services.filter((service) => service.popular);
}
export function formatPrice(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}
