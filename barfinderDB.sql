use barfinder;
-- Step 1: Create bar_address table
CREATE TABLE bar_address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    bar_id INT,
    street_name VARCHAR(45) NOT NULL,
    street_number INT NOT NULL,
    zip_code INT NOT NULL,
    city VARCHAR(45) NOT NULL
);

-- Step 2: Create bar_location table
CREATE TABLE bar_location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    bar_id INT,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL
);

-- Step 3: Create Bar table
CREATE TABLE Bar (
    bar_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    rating INT DEFAULT NULL,
    kvadratmeter INT DEFAULT NULL,
    bar_address_id INT,
    bar_location_id INT,
    FOREIGN KEY (bar_address_id) REFERENCES bar_address(address_id),
    FOREIGN KEY (bar_location_id) REFERENCES bar_location(location_id)
);

-- Step 4: Create user_address table
CREATE TABLE user_address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    street_name VARCHAR(45) NOT NULL,
    street_number INT NOT NULL,
    zip_code INT NOT NULL
);

-- Step 5: Create user table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    user_address_id INT,
    FOREIGN KEY (user_address_id) REFERENCES user_address(address_id)
);

-- Step 6: Create favorites table
CREATE TABLE favorites (
    fav_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bar_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (bar_id) REFERENCES Bar(bar_id)
);




INSERT INTO bar_address (bar_id, street_name, street_number, zip_code, city) 
VALUES 
(1, 'Dannebrogsgade', 6, 1660, 'København V'),
(2, 'Valkendorfsgade', 11, 1151, 'København K'),
(3, 'Viktoriagade', 8, 1655, 'København V'),
(4, 'Åboulevard', 9, 1635, 'København'),
(5, 'Halmtorvet', 29, 1700, 'København V'),
(6, 'Rantzausgade', 56, 2200, 'København N'),
(7, 'Vendersgade', 22, 1363, 'København K'),
(8, 'Fabriksområdet', 52, 1440, 'København K'),
(9, 'Vesterbrogade', 72, 1620, 'København V'),
(10, 'Griffenfeldsgade', 22, 2200, 'København N');

-- Insert data into bar_location
INSERT INTO bar_location (bar_id, lat, lng) 
VALUES 
(1, 55.72598241, 12.50684750),
(2, 55.67412347, 12.56439281),
(3, 55.67182965, 12.54367293),
(4, 55.68672938, 12.54820394),
(5, 55.66892057, 12.56102834),
(6, 55.69347298, 12.54281736),
(7, 55.68329471, 12.56548329),
(8, 55.67698219, 12.56478120),
(9, 55.67218456, 12.55092376),
(10, 55.68762384, 12.55509873);


-- Insert data into Bar
INSERT INTO Bar (name, rating, kvadratmeter, bar_address_id, bar_location_id) 
VALUES 
('Duck and Cover', 1, 197, 1, 1),
('Balderdash', 3, 158, 2, 2),
('Mikkeller Bar', 5, 121, 3, 3),
('Dexter''s', 4, 200, 4, 4),
('Fermentoren', 2, 145, 5, 5),
('Kølsters Tolv Haner', 5, 172, 6, 6),
('Petanque Bar & Terrasse', 4, 134, 7, 7),
('Nemoland', 3, 156, 8, 8),
('Lidkoeb', 5, 189, 9, 9),
('Café Auto', 4, 168, 10, 10);
select * from bar
DELETE FROM Bar;
DELETE FROM bar_address;
DELETE FROM bar_location;
-- Insert data into user_address
INSERT INTO user_address (user_id, street_name, street_number, zip_code)
VALUES
(1, 'Nørregade', 12, 2100),
(2, 'Strandvejen', 3, 2900),
(3, 'Rosenvej', 8, 5000),
(4, 'Skovvej', 1, 6000),
(5, 'Søndergade', 9, 4000);

-- Insert data into user
INSERT INTO user (user_id, username, password, user_address_id)
VALUES
(1, 'bruger1', 'password123', 1),
(2, 'bruger2', 'kodeord456', 2),
(3, 'bruger3', 'hemmelig789', 3),
(4, 'bruger4', 'sikkerhed000', 4),
(5, 'bruger5', 'password999', 5);

-- Insert data into favorites
INSERT INTO favorites (user_id, bar_id)
VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 4),
(4, 5);
select * from bar_address
-- Insert data into bar_address
INSERT INTO bar_address (bar_id, street_name, street_number, zip_code, city) 
VALUES 
    (1, 'Gråbrødretorv', 8, 1154, 'København K'),
    (2, 'Viktoriagade', 8, 1655, 'København V'),
    (3, 'Nybrogade', 10, 1203, 'København K'),
    (4, 'Vesterbrogade', 72, 1620, 'København V'),
    (5, 'Vester Fælledvej', 71, 1606, 'København V'),
    (6, 'Vesterbrogade', 86, 1620, 'København V'),
    (7, 'Skindergade', 34, 1153, 'København K'),
    (8, 'Stormgade', 5, 1400, 'København K'),
    (9, 'Lersø Parkallé', 86, 2720, 'Vanløse'),
    (10, 'H. C. Andersens Boulevard', 36, 1630, 'København V'),
    (11, 'Strøget', 8, 1154, 'København K'),
    (12, 'Vesterbrogade', 45, 1620, 'København V'),
    (13, 'Christianshavn', 22, 1401, 'København'),
    (14, 'Østerbrogade', 58, 2100, 'København Ø'),
    (15, 'Nørrebrogade', 104, 2200, 'København N'),
    (16, 'Frederiksberg Allé', 30, 1820, 'Frederiksberg'),
    (17, 'Amagerbrogade', 76, 2300, 'København S'),
    (18, 'Kongens Nytorv', 8, 1050, 'København K'),
    (19, 'Østergade', 40, 8000, 'Aarhus'),
    (20, 'Søndre Allé', 50, 1720, 'København V'),
    (21, 'Hovedvejen', 200, 1850, 'Frederiksberg'),
    (22, 'Grønningen', 33, 1800, 'Frederiksberg'),
    (23, 'Nørrebrogade', 150, 2200, 'København N'),
    (24, 'Algade', 25, 8000, 'Aarhus'),
    (25, 'Vestergade', 12, 8000, 'Aarhus'),
    (26, 'Gammel Kongevej', 46, 1610, 'København V'),
    (27, 'Christianshavn', 58, 1401, 'København'),
    (28, 'Enghave Plads', 90, 1674, 'København V'),
    (29, 'Gammel Kongevej', 110, 1610, 'København V'),
    (30, 'Jagtvej', 220, 2820, 'Gentofte'),
    (31, 'Århusgade', 14, 2100, 'København Ø'),
    (32, 'Ryparken', 38, 2750, 'Ballerup'),
    (33, 'Borups Allé', 60, 2400, 'København NV'),
    (34, 'Adelgade', 22, 1700, 'København V'),
    (35, 'Skovvej', 80, 6000, 'Aarhus'),
    (36, 'Strandvejen', 150, 2900, 'Hellerup'),
    (37, 'H.C. Ørsted Vej', 100, 2100, 'København Ø'),
    (38, 'Amager Strandvej', 85, 2300, 'København S'),
    (39, 'Vesterport', 10, 1600, 'København V'),
    (40, 'Nørre Allé', 55, 2200, 'København N'),
    (41, 'Gammel Kongevej', 75, 1610, 'København V'),
    (42, 'Christianshavn', 85, 1401, 'København'),
    (43, 'Øster Voldgade', 120, 1350, 'København K'),
    (44, 'Nordre Fasanvej', 200, 2200, 'København N'),
    (45, 'Frederiksberg Center', 15, 1820, 'Frederiksberg'),
    (46, 'Kalvebod Brygge', 60, 1560, 'København V'),
    (47, 'Sydhavn', 35, 2300, 'København S'),
    (48, 'Frederiksborggade', 45, 1600, 'København V'),
    (49, 'Rigensgade', 25, 1470, 'København K'),
    (50, 'Maglegården', 5, 1300, 'København K'),
    (51, 'Mejlgade', 15, 8000, 'Aarhus'),
    (52, 'Limfjordsgade', 20, 8000, 'Aarhus'),
    (53, 'Søndre Allé', 50, 8000, 'Aarhus'),
    (54, 'Ny Banegårdsgade', 28, 8000, 'Aarhus'),
    (55, 'Viborgvej', 12, 8000, 'Aarhus'),
    (56, 'Søndre Allé', 30, 5000, 'Odense'),
    (57, 'Vestergade', 12, 5000, 'Odense'),
    (58, 'Kongensgade', 8, 5000, 'Odense'),
    (59, 'Jernbanegade', 25, 5000, 'Odense'),
    (60, 'Dr. E. Suhrs Gade', 18, 5000, 'Odense'),
    (61, 'Strandgade', 25, 2100, 'København Ø'),
    (62, 'Nørre Farimagsgade', 50, 2200, 'København N'),
    (63, 'Købmagergade', 32, 1150, 'København K'),
    (64, 'Gothersgade', 40, 1123, 'København K'),
    (65, 'Skindergade', 12, 2200, 'København N'),
    (66, 'Vesterbrogade', 100, 1620, 'København V'),
    (67, 'Jagtvej', 35, 2200, 'København N'),
    (68, 'Åboulevard', 60, 2200, 'København N'),
    (69, 'Pilestræde', 15, 1453, 'København K'),
    (70, 'Torvegade', 80, 2100, 'København Ø'),
    (71, 'Nørre Allé', 70, 2200, 'København N'),
    (72, 'Prinsessegade', 10, 1306, 'København K'),
    (73, 'H.C. Ørsteds Vej', 50, 1057, 'København K'),
    (74, 'Lille Strand', 5, 1253, 'København K'),
    (75, 'Store Kongensgade', 28, 1264, 'København K'),
    (76, 'Kalvebod Brygge', 45, 1560, 'København V'),
    (77, 'Frederiksholms Kanal', 18, 1263, 'København K'),
    (78, 'Sønder Boulevard', 22, 1720, 'København V'),
    (79, 'Øster Voldgade', 34, 1350, 'København K'),
    (80, 'Bredgade', 55, 1260, 'København K'),
    (81, 'Vestergade', 90, 1850, 'Frederiksberg'),
    (82, 'Sankt Annæ Gade', 14, 1263, 'København K'),
    (83, 'Maglegården', 60, 1300, 'København K'),
    (84, 'Østre Landsvej', 100, 2100, 'København Ø'),
    (85, 'Carsten Niebuhrs Gade', 8, 1466, 'København K'),
    (86, 'Godtandgade', 12, 1655, 'København V'),
    (87, 'Øster Allé', 50, 2100, 'København Ø'),
    (88, 'Toldbodgade', 7, 1253, 'København K'),
    (89, 'Mariasgade', 22, 1203, 'København K'),
    (90, 'Kronprinsessegade', 14, 1306, 'København K'),
    (91, 'Holbergsgade', 20, 1350, 'København K'),
    (92, 'Frederiksgade', 30, 1360, 'København K'),
    (93, 'Admiralgade', 18, 1265, 'København K'),
    (94, 'Østbanegade', 25, 2100, 'København Ø'),
    (95, 'Reventlowsgade', 16, 1462, 'København K'),
    (96, 'Køge Ås', 40, 2300, 'København S'),
    (97, 'Toldbodgade', 28, 1253, 'København K'),
    (98, 'Pilestræde', 12, 1453, 'København K'),
    (99, 'Lyngbyvej', 70, 2800, 'Lyngby'),
    (100, 'Viggo Hillesgade', 33, 1650, 'København V'),
    (101, 'Frederiks Allé', 50, 1820, 'Frederiksberg'),
    (102, 'Amagerbrogade', 76, 2300, 'København S'),
    (103, 'Kongens Nytorv', 8, 1050, 'København K'),
    (104, 'Østergade', 40, 8000, 'Aarhus'),
    (105, 'Søndre Allé', 50, 1720, 'København V'),
    (106, 'Hovedvejen', 200, 1850, 'Frederiksberg'),
    (107, 'Grønningen', 33, 1800, 'Frederiksberg'),
    (108, 'Nørrebrogade', 150, 2200, 'København N'),
    (109, 'Algade', 25, 8000, 'Aarhus'),
    (110, 'Vestergade', 12, 8000, 'Aarhus'),
    (111, 'Gammel Kongevej', 46, 1610, 'København V'),
    (112, 'Christianshavn', 58, 1401, 'København'),
    (113, 'Enghave Plads', 90, 1674, 'København V'),
    (114, 'Gammel Kongevej', 110, 1610, 'København V'),
    (115, 'Jagtvej', 220, 2820, 'Gentofte'),
    (116, 'Århusgade', 14, 2100, 'København Ø'),
    (117, 'Ryparken', 38, 2750, 'Ballerup'),
    (118, 'Borups Allé', 60, 2400, 'København NV'),
    (119, 'Adelgade', 22, 1700, 'København V'),
    (120, 'Skovvej', 80, 6000, 'Aarhus'),
    (121, 'Strandvejen', 150, 2900, 'Hellerup'),
    (122, 'H.C. Ørsted Vej', 100, 2100, 'København Ø'),
    (123, 'Amager Strandvej', 85, 2300, 'København S'),
    (124, 'Vesterport', 10, 1600, 'København V'),
    (125, 'Nørre Allé', 55, 2200, 'København N'),
    (126, 'Gammel Kongevej', 75, 1610, 'København V'),
    (127, 'Christianshavn', 85, 1401, 'København'),
    (128, 'Øster Voldgade', 120, 1350, 'København K'),
    (129, 'Nordre Fasanvej', 200, 2200, 'København N'),
    (130, 'Frederiksberg Center', 15, 1820, 'Frederiksberg'),
    (131, 'Kalvebod Brygge', 60, 1560, 'København V'),
    (132, 'Sydhavn', 35, 2300, 'København S'),
    (133, 'Frederiksborggade', 45, 1600, 'København V'),
    (134, 'Rigensgade', 25, 1470, 'København K'),
    (135, 'Maglegården', 5, 1300, 'København K'),
    (136, 'Mejlgade', 15, 8000, 'Aarhus'),
    (137, 'Limfjordsgade', 20, 8000, 'Aarhus'),
    (138, 'Søndre Allé', 50, 8000, 'Aarhus'),
    (139, 'Ny Banegårdsgade', 28, 8000, 'Aarhus'),
    (140, 'Viborgvej', 12, 8000, 'Aarhus'),
    (141, 'Søndre Allé', 30, 5000, 'Odense'),
    (142, 'Vestergade', 12, 5000, 'Odense'),
    (143, 'Kongensgade', 8, 5000, 'Odense'),
    (144, 'Jernbanegade', 25, 5000, 'Odense'),
    (145, 'Dr. E. Suhrs Gade', 18, 5000, 'Odense'),
    (146, 'Strandgade', 25, 2100, 'København Ø'),
    (147, 'Nørre Farimagsgade', 50, 2200, 'København N'),
    (148, 'Købmagergade', 32, 1150, 'København K'),
    (149, 'Gothersgade', 40, 1123, 'København K'),
    (150, 'Nørregade', 34, 1165, 'København K');
    -- Insert data into bar_location

INSERT INTO bar_location (bar_id, lat, lng) 
VALUES 
    (1, 55.6800, 12.5680),
    (2, 55.6730, 12.5450),
    (3, 55.6790, 12.5670),
    (4, 55.6760, 12.5600),
    (5, 55.6735, 12.5615),
    (6, 55.6765, 12.5620),
    (7, 55.6760, 12.5680),
    (8, 55.6762, 12.5678),
    (9, 55.6820, 12.4960),
    (10, 55.6680, 12.5660),
    (11, 55.6800, 12.5680),
    (12, 55.6760, 12.5600),
    (13, 55.6761, 12.5674),
    (14, 55.6913, 12.5667),
    (15, 55.6944, 12.5551),
    (16, 55.6741, 12.5473),
    (17, 55.6388, 12.5965),
    (18, 55.6766, 12.5683),
    (19, 56.1620, 10.2030),
    (20, 55.6657, 12.5575),
    (21, 55.7000, 12.3520),
    (22, 55.6761, 12.5511),
    (23, 55.6934, 12.5531),
    (24, 55.6790, 10.2040),
    (25, 56.1622, 10.2042),
    (26, 55.6761, 12.5511),
    (27, 55.6758, 12.5672),
    (28, 55.6784, 12.5641),
    (29, 55.6795, 12.5658),
    (30, 55.7569, 12.5813),
    (31, 55.6964, 12.5755),
    (32, 55.7000, 12.3520),
    (33, 55.6791, 12.5359),
    (34, 55.6798, 12.5627),
    (35, 56.1620, 10.2030),
    (36, 55.7250, 12.5600),
    (37, 55.6915, 12.5698),
    (38, 55.6360, 12.5895),
    (39, 55.6733, 12.5750),
    (40, 55.6950, 12.5490),
    (41, 55.6790, 12.5640),
    (42, 55.6760, 12.5680),
    (43, 55.6831, 12.5700),
    (44, 55.6955, 12.5605),
    (45, 55.6730, 12.5430),
    (46, 55.6690, 12.5560),
    (47, 55.6270, 12.5900),
    (48, 55.6755, 12.5635),
    (49, 55.6765, 12.5705),
    (50, 55.6739, 12.5662),
    (51, 56.1629, 10.2039),
    (52, 56.1630, 10.2040),
    (53, 56.1625, 10.2045),
    (54, 56.1627, 10.2035),
    (55, 56.1630, 10.2050),
    (56, 55.6275, 12.5905),
    (61, 55.6802, 12.5900),
    (62, 55.7070, 12.5500),
    (63, 55.6795, 12.5665),
    (64, 55.6812, 12.5738),
    (65, 55.6980, 12.5345),
    (66, 55.6720, 12.5640),
    (67, 55.7030, 12.5480),
    (68, 55.6940, 12.5500),
    (69, 55.6875, 12.5735),
    (70, 55.6820, 12.5800),
    (71, 55.6970, 12.5485),
    (72, 55.6755, 12.5850),
    (73, 55.6790, 12.5815),
    (74, 55.6793, 12.5840),
    (75, 55.6788, 12.5895),
    (76, 55.6690, 12.5680),
    (77, 55.6825, 12.5830),
    (78, 55.6650, 12.5665),
    (79, 55.6795, 12.5690),
    (80, 55.6802, 12.5900),
    (81, 55.6725, 12.5670),
    (82, 55.6789, 12.5835),
    (83, 55.6750, 12.5705),
    (84, 55.6910, 12.5710),
    (85, 55.6768, 12.5698),
    (86, 55.6745, 12.5600),
    (87, 55.6865, 12.5690),
    (88, 55.6805, 12.5820),
    (89, 55.6790, 12.5700),
    (90, 55.6798, 12.5805),
    (91, 55.6835, 12.5650),
    (92, 55.6795, 12.5715),
    (93, 55.6792, 12.5855),
    (94, 55.6820, 12.5750),
    (95, 55.6825, 12.5620),
    (96, 55.6705, 12.6060),
    (97, 55.6803, 12.5832),
    (98, 55.6870, 12.5750),
    (99, 55.7530, 12.5360),
    (100, 55.6799, 12.5623),
    (101, 55.6730, 12.5430),
    (102, 55.6388, 12.5965),
    (103, 55.6766, 12.5683),
    (104, 56.1620, 10.2030),
    (105, 55.6657, 12.5575),
    (106, 55.7000, 12.3520),
    (107, 55.6761, 12.5511),
    (108, 55.6934, 12.5531),
    (109, 55.6790, 10.2040),
    (110, 56.1622, 10.2042),
    (111, 55.6761, 12.5511),
    (112, 55.6758, 12.5672),
    (113, 55.6784, 12.5641),
    (114, 55.6795, 12.5658),
    (115, 55.7569, 12.5813),
    (116, 55.6964, 12.5755),
    (117, 55.7000, 12.3520),
    (118, 55.6791, 12.5359),
    (119, 55.6798, 12.5627),
    (120, 56.1620, 10.2030),
    (121, 55.7250, 12.5600),
    (122, 55.6915, 12.5698),
    (123, 55.6360, 12.5895),
    (124, 55.6733, 12.5750),
    (125, 55.6950, 12.5490),
    (126, 55.6790, 12.5640),
    (127, 55.6760, 12.5680),
    (128, 55.6831, 12.5700),
    (129, 55.6955, 12.5605),
    (130, 55.6730, 12.5430),
    (131, 55.6690, 12.5560),
    (132, 55.6270, 12.5900),
    (133, 55.6755, 12.5635),
    (134, 55.6790, 12.5700),
    (135, 55.6798, 12.5805),
    (136, 55.4001, 10.3852),
    (137, 56.1629, 10.2039),
    (138, 56.1630, 10.2040),
    (139, 56.1625, 10.2045),
    (140, 56.1627, 10.2035),
    (141, 55.6275, 12.5905),
    (142, 55.6275, 12.5905),
    (143, 55.6805, 12.5820),
    (144, 55.6790, 12.5700),
    (145, 55.6798, 12.5805),
    (146, 55.6802, 12.5900),
    (147, 55.7070, 12.5500),
    (148, 55.6795, 12.5665),
    (149, 55.6795, 12.5665),
    (150, 55.6788, 12.5730);
    

-- Insert data into Bar
INSERT INTO Bar (name, rating, kvadratmeter, bar_address_id, bar_location_id) 
VALUES 
    ('The Jane', 5, 150, 1, 1),
    ('Mikkeller Bar', 5, 180, 2, 2),
    ('Ruby', 4, 160, 3, 3),
    ('Lidkoeb', 5, 200, 4, 4),
    ('Bakken', 4, 170, 5, 5),
    ('WoodBar', 4, 190, 6, 6),
    ('Bror Bar', 4, 175, 7, 7),
    ('Tjek Ind', 3, 150, 8, 8),
    ('Bar86', 4, 160, 9, 9),
    ('Curfew', 5, 200, 10, 10),
    ('The Jane', 5, 150, 11, 11),
    ('Mikkeller Bar', 5, 180, 12, 12),
    ('Harbor Lights', 4, 160, 13, 13),
    ('Nordic Nectar', 5, 170, 14, 14),
    ('The Green Parrot', 5, 200, 15, 15),
    ('Sapphire Social', 5, 190, 16, 16),
    ('Twilight Tavern', 4, 175, 17, 17),
    ('Royal Rum', 5, 220, 18, 18),
    ('The Cozy Corner', 4, 160, 19, 19),
    ('Midnight Mirage', 4, 180, 20, 20),
    ('Echoes & Elixirs', 4, 165, 21, 21),
    ('The Sapphire Room', 5, 210, 22, 22),
    ('Liquid Lush', 4, 155, 23, 23),
    ('Mystic Moon', 4, 170, 24, 24),
    ('The Silver Spoon', 5, 190, 25, 25),
    ('Blue Horizon', 4, 200, 26, 26),
    ('The Rusty Anchor', 4, 175, 27, 27),
    ('Ember & Ash', 4, 160, 28, 28),
    ('The Golden Galleon', 5, 220, 29, 29),
    ('Velvet Vibes', 4, 180, 30, 30),
    ('The Hidden Pearl', 4, 170, 31, 31),
    ('Crimson Cove', 4, 165, 32, 32),
    ('Lunar Lounge', 5, 210, 33, 33),
    ('The Copper Cup', 4, 175, 34, 34),
    ('Ember Ember', 4, 160, 35, 35),
    ('The Enchanted Elm', 4, 180, 36, 36),
    ('Crimson Corner', 5, 200, 37, 37),
    ('The Hidden Harbor', 4, 190, 38, 38),
    ('The Blue Boar', 4, 160, 39, 39),
    ('The Sapphire Shaker', 5, 170, 40, 40),
    ('The Mystic Mug', 5, 210, 41, 41),
    ('Harbor House', 4, 185, 42, 42),
    ('The Blue Boar', 4, 160, 43, 43),
    ('The Silver Spoon', 4, 170, 44, 44),
    ('The Golden Lantern', 5, 220, 45, 45),
    ('The Hidden Pearl', 4, 180, 46, 46),
    ('Twilight Tavern', 4, 175, 47, 47),
    ('The Golden Gazer', 4, 190, 48, 48),
    ('The Emerald Ember', 5, 210, 49, 49),
    ('Lunar Libations', 4, 180, 50, 50),
    ('Mikkeller Aarhus', 5, 180, 51, 51),
    ('Limfjordsgade Bar', 4, 160, 52, 52),
    ('Bru Bar', 4, 150, 53, 53),
    ('Aarhus Brewery', 5, 200, 54, 54),
    ('Cocktail Collective', 4, 170, 55, 55),
    ('Odense Oasis', 4, 160, 56, 56),
    
    -- Barer 61 til 150
    ('Sunset Lounge', 5, 200, 61, 61),
    ('Northern Lights', 4, 180, 62, 62),
    ('The Royal Oak', 5, 160, 63, 63),
    ('Copenhagen Classics', 5, 220, 64, 64),
    ('Nørrebro Nights', 4, 170, 65, 65),
    ('Vester Vibes', 4, 190, 66, 66),
    ('Jagtvej Junction', 4, 175, 67, 67),
    ('Boulevard Beats', 5, 210, 68, 68),
    ('Pilestræde Pub', 4, 160, 69, 69),
    ('Torvegade Tavern', 5, 200, 70, 70),
    ('Nørre Allé Nest', 4, 165, 71, 71),
    ('Prinsesse Palace', 5, 220, 72, 72),
    ('Ørsteds Oasis', 4, 185, 73, 73),
    ('Lille Strand Lounge', 4, 160, 74, 74),
    ('Store Kongens Bar', 4, 190, 75, 75),
    ('Kalvebod Corner', 5, 210, 76, 76),
    ('Frederiksholm Fusion', 4, 175, 77, 77),
    ('Sønder Spirit', 4, 165, 78, 78),
    ('Voldgade Venue', 5, 220, 79, 79),
    ('Bredgade Brew', 4, 180, 80, 80),
    ('Vestergade Vortex', 4, 160, 81, 81),
    ('Sankt Annæ Social', 5, 210, 82, 82),
    ('Maglegården Mixer', 4, 175, 83, 83),
    ('Østre Allé Lounge', 5, 220, 84, 84),
    ('Carsten\'s Corner', 4, 180, 85, 85),
    ('Godtand Grove', 4, 160, 86, 86),
    ('Øster Allé Lounge', 5, 210, 87, 87),
    ('Toldbod Tower', 4, 175, 88, 88),
    ('Marias Magic', 4, 165, 89, 89),
    ('Kronprins Kitchen', 5, 220, 90, 90),
    ('Holberg House', 4, 180, 91, 91),
    ('Frederik\'s Folly', 4, 160, 92, 92),
    ('Admiral\'s Alcove', 5, 210, 93, 93),
    ('Østbanen Oasis', 4, 175, 94, 94),
    ('Reventlow Retreat', 4, 165, 95, 95),
    ('Søge Ås Spirits', 5, 220, 96, 96),
    ('Toldbod Tavern', 4, 180, 97, 97),
    ('Pilestræde Place', 4, 160, 98, 98),
    ('Lyngby Libations', 5, 210, 99, 99),
    ('Viggo’s Vault', 4, 175, 100, 100),
    ('Frederiks Allé Fusion', 5, 200, 101, 101),
    ('Amager Bodega', 4, 180, 102, 102),
    ('Nytorv Nook', 5, 160, 103, 103),
    ('Østergade Oasis', 4, 170, 104, 104),
    ('Søndre Vibe', 5, 210, 105, 105),
    ('Frederiksberg Fizz', 4, 190, 106, 106),
    ('Grønningen Groove', 5, 175, 107, 107),
    ('Nørrebrogade Nectar', 4, 165, 108, 108),
    ('Algade Alehouse', 5, 200, 109, 109),
    ('Vestergade Vino', 4, 160, 110, 110),
    ('Gammel Kongevej Gold', 5, 220, 111, 111),
    ('Christianshavn Charm', 4, 175, 112, 112),
    ('Enghave Plads Espresso', 4, 160, 113, 113),
    ('Gammel Kongevej Grove', 5, 220, 114, 114),
    ('Jagtvej Jazz', 4, 175, 115, 115),
    ('Århusgade Ales', 5, 210, 116, 116),
    ('Ryparken Rum', 4, 165, 117, 117),
    ('Borups Allé Brew', 5, 200, 118, 118),
    ('Adelgade Ale', 4, 160, 119, 119),
    ('Skovvej Spirits', 5, 220, 120, 120),
    ('Strandvejen Spirits', 4, 175, 121, 121),
    ('H.C. Ørsted Haven', 5, 210, 122, 122),
    ('Amager Strand Spirits', 4, 180, 123, 123),
    ('Vesterport Vibes', 5, 200, 124, 124),
    ('Nørre Allé Nectar', 4, 165, 125, 125),
    ('Gammel Kongevej Garden', 5, 220, 126, 126),
    ('Christianshavn Cove', 4, 170, 127, 127),
    ('Øster Voldgade Venue', 5, 210, 128, 128),
    ('Nordre Fasanvej Fizz', 4, 165, 129, 129),
    ('Frederiksberg Fountain', 5, 220, 130, 130),
    ('Kalvebod Brygge Brew', 4, 180, 131, 131),
    ('Sydhavn Sip', 5, 210, 132, 132),
    ('Frederiksborggade Fizz', 4, 175, 133, 133),
    ('Rigensgade Reserve', 5, 220, 134, 134),
    ('Maglegården Mixer', 4, 160, 135, 135),
    ('Mejlgade Mixer', 5, 210, 136, 136),
    ('Limfjordsgade Lounge', 4, 175, 137, 137),
    ('Søndre Allé Spirits', 5, 220, 138, 138),
    ('Ny Banegårdsgade Brew', 4, 160, 139, 139),
    ('Viborgvej Vines', 5, 210, 140, 140),
    ('Søndre Allé Sip', 4, 175, 141, 141),
    ('Vestergade Vino', 5, 220, 142, 142),
    ('Kongensgade Kocktails', 4, 160, 143, 143),
    ('Jernbanegade Jazz', 5, 210, 144, 144),
    ('Dr. E. Suhrs Spirits', 4, 175, 145, 145),
    ('Strandgade Spirits', 5, 220, 146, 146),
    ('Nørre Farimagsgade Fizz', 4, 165, 147, 147),
    ('Købmagergade Kocktails', 5, 210, 148, 148),
    ('Gothersgade Gold', 4, 175, 149, 149),
    ('Nørregade Nectar', 5, 220, 150, 150);
