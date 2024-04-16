Para criar as tabelas no banco de dados nutritrack


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(15),
    avatar_img TEXT,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS food_plan (
  id SERIAL PRIMARY KEY,
  type VARCHAR(30),
  carbohydrate DECIMAL,
  protein DECIMAL,
  lipid DECIMAL,
  description TEXT
);


CREATE TABLE config_history (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    food_plan_id INTEGER REFERENCES food_plan(id),
    activity_level VARCHAR(30),
    weight DECIMAL,
    height DECIMAL,
    birth_date DATE,
    gender VARCHAR(1),
    created_at DATE DEFAULT CURRENT_DATE
);


INSERT INTO food_plan(type, carbohydrate, protein, lipid, description) 
VALUES 
('Peder Peso', 45, 30, 25, 'Essa dieta contém todos os ingredientes necessários e a alta ingestão de proteína ajuda a manter o corpo em forma e reduzir a fome, auxiliando na manutenção da baixa ingestão de calorias!'),
('Manter Peso', 55, 15, 30, 'Essa dieta se baseia nas diretrizes da boa nutrição e te ajudará a manter o peso atual com uma alimentação saudável e balanceada!'),
('Ganhar Peso', 50, 25, 25, 'Essa dieta é recomendada para as pessoas que querem ganhar massa muscular e melhorar a sua performance! O balanceamento de gorduras e carboidratos darão energia, eenquanto a proteína auxiliará no desenvolvimento muscular!');

CREATE TABLE IF NOT EXISTS food (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100),
  calorie DECIMAL,
  carbohydrate DECIMAL,
  protein DECIMAL,
  lipid DECIMAL
);


CREATE TABLE IF NOT EXISTS food_added (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    food_id INTEGER REFERENCES food(id) ON DELETE CASCADE,
    food_quantity DECIMAL,
    meal VARCHAR(30),
    created_at DATE DEFAULT CURRENT_DATE
);
