Para criar as tabelas no banco de dados nutritrack


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS food_plan (
  id SERIAL PRIMARY KEY,
  type VARCHAR(30),
  carbohydrate DECIMAL,
  protein DECIMAL,
  lipid DECIMAL,
  description TEXT
);

INSERT INTO food_plan(type, carbohydrate, protein, lipid, description) 
VALUES 
('Peder Peso', 45, 30, 25, 'Essa dieta contém todos os ingredientes necessários e a alta ingestão de proteína ajuda a manter o corpo em forma e reduzir a fome, auxiliando na manutenção da baixa ingestão de calorias!'),
('Manter Peso', 55, 15, 30, 'Essa dieta se baseia nas diretrizes da boa nutrição e te ajudará a manter o peso atual com uma alimentação saudável e balanceada!'),
('Ganhar Peso', 50, 25, 25, 'Essa dieta é recomendada para as pessoas que querem ganhar massa muscular e melhorar a sua performance! O balanceamento de gorduras e carboidratos darão energia, e a proteína auxiliará o desenvolvimento muscular!');



CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  food_plan_id INTEGER REFERENCES food_plan(id),
  activity_level VARCHAR(30),
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password TEXT,
  weight DECIMAL,
  height DECIMAL,
  birth_date DATE,
  gender VARCHAR(1)
);

CREATE TABLE IF NOT EXISTS food (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(100),
  calorie DECIMAL,
  carbohydrate DECIMAL,
  protein DECIMAL,
  lipid DECIMAL
);

CREATE TABLE IF NOT EXISTS meal (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(30),
  date DATE
);

CREATE TABLE IF NOT EXISTS meal_food (
  id SERIAL PRIMARY KEY,
  meal_id INTEGER REFERENCES meal(id),
  food_id INTEGER REFERENCES food(id),
  quantity DECIMAL
);

