"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-display text-4xl leading-none text-foreground md:text-5xl">
            Common questions, answered plainly.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The things patients ask most often before their first visit.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="mt-10 w-full border-t border-border">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link
            href="/#contact"
            className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
}