-- #88: las reglas de las actividades hablan de neuronas, no de vidas (sistema único de neuronas de la cuenta).
UPDATE "Actividad"
SET "reglas" = REPLACE("reglas"::text, 'pierdes una vida', 'pierdes una neurona')::jsonb
WHERE "reglas"::text LIKE '%pierdes una vida%';
