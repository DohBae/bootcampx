SELECT name, id, cohort_id
FROM students
WHERE phone is NULL OR  email is NULL;