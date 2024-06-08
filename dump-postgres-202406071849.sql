--
-- PostgreSQL database dump
--
BEGIN;
-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-06-07 18:49:40


--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 899 (class 1247 OID 16605)
-- Name: human_possible_hit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.human_possible_hit AS ENUM (
    'head',
    'body',
    'leg'
);


ALTER TYPE public.human_possible_hit OWNER TO postgres;

--
-- TOC entry 902 (class 1247 OID 16612)
-- Name: human_weapon; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.human_weapon AS ENUM (
    'hand',
    'elbow',
    'foot',
    'knee',
    'punch',
    'kick'
);


ALTER TYPE public.human_weapon OWNER TO postgres;

--
-- TOC entry 253 (class 1255 OID 16672)
-- Name: get_column_comments(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_column_comments(table_name text) RETURNS TABLE(column_name text, column_comment text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    EXECUTE FORMAT('
        SELECT a.attname::TEXT AS column_name, pd.description::TEXT AS column_comment
        FROM pg_attribute AS a
        JOIN pg_class AS c ON a.attrelid = c.oid
        LEFT JOIN pg_description AS pd ON a.attrelid = pd.objoid AND a.attnum = pd.objsubid
        WHERE c.relname = %L
        AND a.attnum > 0
        AND NOT a.attisdropped;', table_name);
END;
$$;


ALTER FUNCTION public.get_column_comments(table_name text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 239 (class 1259 OID 16725)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16724)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 238
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 244 (class 1259 OID 16773)
-- Name: background_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.background_tags (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    region_id integer
);


ALTER TABLE public.background_tags OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16772)
-- Name: background_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.background_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.background_tags_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 243
-- Name: background_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.background_tags_id_seq OWNED BY public.background_tags.id;


--
-- TOC entry 248 (class 1259 OID 16792)
-- Name: behavior_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.behavior_tags (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.behavior_tags OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 16791)
-- Name: behavior_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.behavior_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.behavior_tags_id_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 247
-- Name: behavior_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.behavior_tags_id_seq OWNED BY public.behavior_tags.id;


--
-- TOC entry 236 (class 1259 OID 16694)
-- Name: card_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.card_type (
    name character varying(50) NOT NULL,
    card_type_id integer NOT NULL
);


ALTER TABLE public.card_type OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16737)
-- Name: card_type_card_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.card_type_card_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.card_type_card_type_id_seq OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 240
-- Name: card_type_card_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.card_type_card_type_id_seq OWNED BY public.card_type.card_type_id;


--
-- TOC entry 234 (class 1259 OID 16683)
-- Name: division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.division (
    division_id integer NOT NULL,
    division character varying(50) NOT NULL,
    min_weight numeric(5,2),
    max_weight numeric(5,2)
);


ALTER TABLE public.division OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16486)
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    event_id integer NOT NULL,
    organisation_id integer,
    name text NOT NULL,
    date date,
    location text,
    description character varying,
    photo_url character varying
);


ALTER TABLE public.event OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16485)
-- Name: event_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_event_id_seq OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 218
-- Name: event_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_event_id_seq OWNED BY public.event.event_id;


--
-- TOC entry 223 (class 1259 OID 16509)
-- Name: fight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fight (
    fight_id integer NOT NULL,
    event_id integer,
    fighter1_id integer,
    fighter2_id integer,
    winner_id integer,
    fight_round integer,
    division text,
    card_type text,
    number_round integer DEFAULT 3,
    fight_name character varying,
    round_length integer
);


ALTER TABLE public.fight OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 223
-- Name: COLUMN fight.division; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.fight.division IS 'type: division';


--
-- TOC entry 222 (class 1259 OID 16508)
-- Name: fight_fight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fight_fight_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fight_fight_id_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 222
-- Name: fight_fight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fight_fight_id_seq OWNED BY public.fight.fight_id;


--
-- TOC entry 221 (class 1259 OID 16500)
-- Name: fighter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fighter (
    fighter_id integer NOT NULL,
    first_name text NOT NULL,
    last_name character varying,
    nickname character varying,
    height character varying,
    weight integer,
    reach integer,
    stance character varying,
    wins integer,
    losses integer,
    draws integer,
    full_name character varying(255)
);


ALTER TABLE public.fighter OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16499)
-- Name: fighter_fighter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fighter_fighter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fighter_fighter_id_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 220
-- Name: fighter_fighter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fighter_fighter_id_seq OWNED BY public.fighter.fighter_id;


--
-- TOC entry 250 (class 1259 OID 16799)
-- Name: known_for_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.known_for_tags (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.known_for_tags OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 16798)
-- Name: known_for_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.known_for_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.known_for_tags_id_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 249
-- Name: known_for_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.known_for_tags_id_seq OWNED BY public.known_for_tags.id;


--
-- TOC entry 252 (class 1259 OID 16808)
-- Name: moves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moves (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.moves OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 16807)
-- Name: moves_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.moves_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.moves_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 251
-- Name: moves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.moves_id_seq OWNED BY public.moves.id;


--
-- TOC entry 232 (class 1259 OID 16674)
-- Name: navbar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.navbar (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(255) NOT NULL
);


ALTER TABLE public.navbar OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16673)
-- Name: navbar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.navbar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.navbar_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 231
-- Name: navbar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.navbar_id_seq OWNED BY public.navbar.id;


--
-- TOC entry 235 (class 1259 OID 16689)
-- Name: number_round; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.number_round (
    length integer NOT NULL,
    number_round_id integer NOT NULL
);


ALTER TABLE public.number_round OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16747)
-- Name: number_round_number_round_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.number_round_number_round_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.number_round_number_round_id_seq OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 241
-- Name: number_round_number_round_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.number_round_number_round_id_seq OWNED BY public.number_round.number_round_id;


--
-- TOC entry 217 (class 1259 OID 16477)
-- Name: organisation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisation (
    organisation_id integer NOT NULL,
    name text NOT NULL,
    headquarter text,
    founded_year integer
);


ALTER TABLE public.organisation OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16476)
-- Name: organisation_organisation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organisation_organisation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organisation_organisation_id_seq OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 216
-- Name: organisation_organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organisation_organisation_id_seq OWNED BY public.organisation.organisation_id;


--
-- TOC entry 246 (class 1259 OID 16780)
-- Name: region; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.region (
    id integer NOT NULL,
    name_en character varying(255) NOT NULL,
    name_fr character varying(255) NOT NULL
);


ALTER TABLE public.region OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16779)
-- Name: region_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.region_id_seq OWNER TO postgres;

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 245
-- Name: region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.region_id_seq OWNED BY public.region.id;


--
-- TOC entry 230 (class 1259 OID 16622)
-- Name: relation_strike_round; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relation_strike_round (
    strike_to_round_id integer NOT NULL,
    sig_strike boolean NOT NULL,
    striker_id integer NOT NULL,
    target_id integer NOT NULL,
    strike_code character varying,
    round_id integer NOT NULL,
    fight_status character varying,
    round_time_in_s integer
);


ALTER TABLE public.relation_strike_round OWNER TO postgres;

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN relation_strike_round.round_time_in_s; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.relation_strike_round.round_time_in_s IS 'in seconds, not 1:30 but 90 ';


--
-- TOC entry 229 (class 1259 OID 16621)
-- Name: relation_strike_round_strike_to_round_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relation_strike_round_strike_to_round_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.relation_strike_round_strike_to_round_id_seq OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 229
-- Name: relation_strike_round_strike_to_round_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relation_strike_round_strike_to_round_id_seq OWNED BY public.relation_strike_round.strike_to_round_id;


--
-- TOC entry 225 (class 1259 OID 16538)
-- Name: round; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.round (
    round_id integer NOT NULL,
    fight_id integer,
    round_number integer,
    round_duration integer,
    fighter1_ground_control integer,
    fighter2_ground_control integer,
    max_duration integer
);


ALTER TABLE public.round OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 225
-- Name: COLUMN round.round_duration; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.round.round_duration IS 'in seconds';


--
-- TOC entry 237 (class 1259 OID 16699)
-- Name: round_length; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.round_length (
    length integer NOT NULL,
    round_length_id integer NOT NULL
);


ALTER TABLE public.round_length OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16757)
-- Name: round_length_round_length_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.round_length_round_length_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.round_length_round_length_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 242
-- Name: round_length_round_length_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.round_length_round_length_id_seq OWNED BY public.round_length.round_length_id;


--
-- TOC entry 224 (class 1259 OID 16537)
-- Name: round_round_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.round_round_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.round_round_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 224
-- Name: round_round_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.round_round_id_seq OWNED BY public.round.round_id;


--
-- TOC entry 226 (class 1259 OID 16550)
-- Name: strike; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strike (
    strike_code character varying NOT NULL,
    human_possible_hit public.human_possible_hit,
    striker_weapon public.human_weapon
);


ALTER TABLE public.strike OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16682)
-- Name: ufc_weight_classes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ufc_weight_classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ufc_weight_classes_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 233
-- Name: ufc_weight_classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ufc_weight_classes_id_seq OWNED BY public.division.division_id;


--
-- TOC entry 228 (class 1259 OID 16564)
-- Name: win; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.win (
    win_id integer NOT NULL,
    fight_id integer,
    fighter_id integer,
    method text
);


ALTER TABLE public.win OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16563)
-- Name: win_win_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.win_win_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.win_win_id_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 227
-- Name: win_win_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.win_win_id_seq OWNED BY public.win.win_id;


--
-- TOC entry 4798 (class 2604 OID 16728)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4799 (class 2604 OID 16776)
-- Name: background_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_tags ALTER COLUMN id SET DEFAULT nextval('public.background_tags_id_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 16795)
-- Name: behavior_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.behavior_tags ALTER COLUMN id SET DEFAULT nextval('public.behavior_tags_id_seq'::regclass);


--
-- TOC entry 4796 (class 2604 OID 16738)
-- Name: card_type card_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card_type ALTER COLUMN card_type_id SET DEFAULT nextval('public.card_type_card_type_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 16686)
-- Name: division division_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.division ALTER COLUMN division_id SET DEFAULT nextval('public.ufc_weight_classes_id_seq'::regclass);


--
-- TOC entry 4786 (class 2604 OID 16489)
-- Name: event event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN event_id SET DEFAULT nextval('public.event_event_id_seq'::regclass);


--
-- TOC entry 4788 (class 2604 OID 16512)
-- Name: fight fight_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight ALTER COLUMN fight_id SET DEFAULT nextval('public.fight_fight_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 16503)
-- Name: fighter fighter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fighter ALTER COLUMN fighter_id SET DEFAULT nextval('public.fighter_fighter_id_seq'::regclass);


--
-- TOC entry 4802 (class 2604 OID 16802)
-- Name: known_for_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.known_for_tags ALTER COLUMN id SET DEFAULT nextval('public.known_for_tags_id_seq'::regclass);


--
-- TOC entry 4803 (class 2604 OID 16811)
-- Name: moves id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moves ALTER COLUMN id SET DEFAULT nextval('public.moves_id_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 16677)
-- Name: navbar id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.navbar ALTER COLUMN id SET DEFAULT nextval('public.navbar_id_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 16748)
-- Name: number_round number_round_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.number_round ALTER COLUMN number_round_id SET DEFAULT nextval('public.number_round_number_round_id_seq'::regclass);


--
-- TOC entry 4785 (class 2604 OID 16480)
-- Name: organisation organisation_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisation ALTER COLUMN organisation_id SET DEFAULT nextval('public.organisation_organisation_id_seq'::regclass);


--
-- TOC entry 4800 (class 2604 OID 16783)
-- Name: region id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region ALTER COLUMN id SET DEFAULT nextval('public.region_id_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 16625)
-- Name: relation_strike_round strike_to_round_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relation_strike_round ALTER COLUMN strike_to_round_id SET DEFAULT nextval('public.relation_strike_round_strike_to_round_id_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 16541)
-- Name: round round_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.round ALTER COLUMN round_id SET DEFAULT nextval('public.round_round_id_seq'::regclass);


--
-- TOC entry 4797 (class 2604 OID 16758)
-- Name: round_length round_length_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.round_length ALTER COLUMN round_length_id SET DEFAULT nextval('public.round_length_round_length_id_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 16567)
-- Name: win win_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.win ALTER COLUMN win_id SET DEFAULT nextval('public.win_win_id_seq'::regclass);


--
-- TOC entry 5024 (class 0 OID 16725)
-- Dependencies: 239
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" VALUES (1, 'Hugo', 'hugo.mazeas19@gmail.com', '$2a$10$.JmPUtgXXcNPkZ8Xq11GJOTnrPNHje/W9tDwXTxscI8vJYZ4imZzu');


--
-- TOC entry 5029 (class 0 OID 16773)
-- Dependencies: 244
-- Data for Name: background_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.background_tags VALUES (9, 'Boxing', NULL);
INSERT INTO public.background_tags VALUES (10, 'Kickboxing', NULL);
INSERT INTO public.background_tags VALUES (11, 'Muy Thai ', NULL);
INSERT INTO public.background_tags VALUES (12, 'Brazilian Jiu-Jitsu', NULL);
INSERT INTO public.background_tags VALUES (13, 'Wrestling ', NULL);
INSERT INTO public.background_tags VALUES (14, 'Karate', NULL);
INSERT INTO public.background_tags VALUES (15, 'MMA', NULL);


--
-- TOC entry 5033 (class 0 OID 16792)
-- Dependencies: 248
-- Data for Name: behavior_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.behavior_tags VALUES (1, 'Counter-Striker', 'Waits for the opponent to attack first to launch counter-moves.');
INSERT INTO public.behavior_tags VALUES (2, 'Pressure Fighter', 'Constantly moves forward, putting pressure on the opponent.');
INSERT INTO public.behavior_tags VALUES (3, 'Brawler', 'Relies on brute strength and toughness over technique.');
INSERT INTO public.behavior_tags VALUES (4, 'Technician', 'Uses precise and efficient techniques.');
INSERT INTO public.behavior_tags VALUES (5, 'Ground-and-Pound', 'Focuses on taking the opponent to the ground and using strikes.');
INSERT INTO public.behavior_tags VALUES (6, 'Submission Specialist', 'Excels in grappling and finishing fights with submission holds.');
INSERT INTO public.behavior_tags VALUES (7, 'Wrestler', 'Utilizes wrestling techniques to control the opponent on the ground.');
INSERT INTO public.behavior_tags VALUES (8, 'Kickboxer', 'Uses kickboxing techniques to maintain distance and strike.');
INSERT INTO public.behavior_tags VALUES (9, 'Muay Thai Fighter', 'Utilizes Muay Thai techniques, emphasizing elbows, knees, and clinch work.');
INSERT INTO public.behavior_tags VALUES (10, 'Boxer', 'Focuses on punching and traditional boxing skills.');
INSERT INTO public.behavior_tags VALUES (11, 'Karate Practitioner', 'Uses karate techniques, emphasizing speed and point striking.');
INSERT INTO public.behavior_tags VALUES (12, 'Judo Practitioner', 'Uses throws and takedowns derived from Judo.');
INSERT INTO public.behavior_tags VALUES (13, 'Taekwondo Fighter', 'Utilizes Taekwondo techniques, focusing on fast and high kicks.');
INSERT INTO public.behavior_tags VALUES (14, 'Defensive Fighter', 'Focuses on avoiding damage and countering attacks.');
INSERT INTO public.behavior_tags VALUES (15, 'Aggressive Fighter', 'Always looks to advance and attack.');
INSERT INTO public.behavior_tags VALUES (16, 'Calm and Collected', 'Maintains composure under pressure to make strategic decisions.');
INSERT INTO public.behavior_tags VALUES (17, 'Risky Fighter', 'Takes chances in hopes of a big payoff.');
INSERT INTO public.behavior_tags VALUES (18, 'Conservative Fighter', 'Avoids unnecessary risks, fighting cautiously.');
INSERT INTO public.behavior_tags VALUES (19, 'Adaptable Fighter', 'Adjusts tactics and style mid-fight to counter the opponent’s strengths.');
INSERT INTO public.behavior_tags VALUES (20, 'Stamina Fighter', 'Relies on superior conditioning to outlast opponents.');
INSERT INTO public.behavior_tags VALUES (21, 'Power Striker', 'Relies on powerful strikes to incapacitate opponents.');
INSERT INTO public.behavior_tags VALUES (22, 'Clinch Fighter', 'Specializes in fighting close to the opponent, using the clinch to control.');
INSERT INTO public.behavior_tags VALUES (23, 'Distance Manager', 'Keeps the fight at an optimal range to leverage reach advantage.');
INSERT INTO public.behavior_tags VALUES (24, 'Feinter', 'Frequently uses feints to confuse opponents about their next move.');
INSERT INTO public.behavior_tags VALUES (25, 'Takedown Specialist', 'Focuses on taking the opponent to the ground.');
INSERT INTO public.behavior_tags VALUES (26, 'Escape Artist', 'Excellent at escaping from seemingly disadvantageous positions.');
INSERT INTO public.behavior_tags VALUES (27, 'Body Lock Specialist', 'Uses body locks to control opponents both standing and on the ground.');
INSERT INTO public.behavior_tags VALUES (28, 'Chain Wrestler', 'Uses a series of connected wrestling techniques to keep the opponent off balance.');
INSERT INTO public.behavior_tags VALUES (29, 'Leg Kick Specialist', 'Utilizes leg kicks to damage and slow down the opponent.');
INSERT INTO public.behavior_tags VALUES (30, 'Switch Stance Fighter', 'Comfortably switches between orthodox and southpaw stances.');
INSERT INTO public.behavior_tags VALUES (31, 'Elbow Specialist', 'Uses elbow strikes effectively, especially in close quarters.');
INSERT INTO public.behavior_tags VALUES (32, 'Knee Specialist', 'Utilizes knee strikes from the clinch or at range.');
INSERT INTO public.behavior_tags VALUES (33, 'Back-Take Specialist', 'Excel at taking and controlling the opponent’s back.');
INSERT INTO public.behavior_tags VALUES (34, 'Guard Player', 'Proficient in fighting off their back, using various guard techniques.');
INSERT INTO public.behavior_tags VALUES (35, 'Top Control Specialist', 'Dominates fights by maintaining control from the top position.');
INSERT INTO public.behavior_tags VALUES (36, 'Head Movement Expert', 'Uses head movement to evade strikes effectively.');
INSERT INTO public.behavior_tags VALUES (37, 'Heavy Hitter', 'Possesses knockout power in strikes.');
INSERT INTO public.behavior_tags VALUES (38, 'High-Output Fighter', 'Maintains a high pace, throwing many strikes to overwhelm opponents.');
INSERT INTO public.behavior_tags VALUES (39, 'Strategic Planner', 'Enters the fight with a well-thought-out game plan.');
INSERT INTO public.behavior_tags VALUES (40, 'Mental Warfare Specialist', 'Uses psychological tactics to unsettle opponents before and during the fight.');
INSERT INTO public.behavior_tags VALUES (41, 'Combo Fighter', 'Uses combinations effectively to break through defenses.');
INSERT INTO public.behavior_tags VALUES (42, 'Range Fighter', 'Specializes in keeping the fight at long range, using jabs and long kicks.');
INSERT INTO public.behavior_tags VALUES (43, 'Dirty Boxer', 'Uses rough tactics in the clinch, including shoulder and forearm strikes.');
INSERT INTO public.behavior_tags VALUES (44, 'Diverse Striker', 'Incorporates strikes from multiple martial arts disciplines.');
INSERT INTO public.behavior_tags VALUES (45, 'Anti-Wrestler', 'Excellent at defending against wrestling and takedowns.');
INSERT INTO public.behavior_tags VALUES (46, 'Cardio Machine', 'Has exceptional endurance, often outlasting opponents in long fights.');
INSERT INTO public.behavior_tags VALUES (47, 'Explosive Fighter', 'Utilizes bursts of speed and power to surprise opponents.');
INSERT INTO public.behavior_tags VALUES (48, 'In-Fighter', 'Excels in close-range combat, using short punches and uppercuts.');
INSERT INTO public.behavior_tags VALUES (49, 'Out-Fighter', 'Focuses on staying outside the opponent''s range, striking with long-range techniques.');
INSERT INTO public.behavior_tags VALUES (50, 'Trap Setter', 'Sets traps by luring opponents into compromising positions.');


--
-- TOC entry 5021 (class 0 OID 16694)
-- Dependencies: 236
-- Data for Name: card_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.card_type VALUES ('Pre-prelim', 1);
INSERT INTO public.card_type VALUES ('Prelim', 2);
INSERT INTO public.card_type VALUES ('Main card', 3);
INSERT INTO public.card_type VALUES ('Co-main fight', 4);
INSERT INTO public.card_type VALUES ('Main fight', 5);


--
-- TOC entry 5019 (class 0 OID 16683)
-- Dependencies: 234
-- Data for Name: division; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.division VALUES (1, 'Strawweight', 0.00, 115.00);
INSERT INTO public.division VALUES (2, 'Flyweight', 115.01, 125.00);
INSERT INTO public.division VALUES (3, 'Bantamweight', 125.01, 135.00);
INSERT INTO public.division VALUES (4, 'Featherweight', 135.01, 145.00);
INSERT INTO public.division VALUES (5, 'Lightweight', 145.01, 155.00);
INSERT INTO public.division VALUES (6, 'Welterweight', 155.01, 170.00);
INSERT INTO public.division VALUES (7, 'Middleweight', 170.01, 185.00);
INSERT INTO public.division VALUES (8, 'Light Heavyweight', 185.01, 205.00);
INSERT INTO public.division VALUES (9, 'Heavyweight', 205.01, 265.00);
INSERT INTO public.division VALUES (10, 'Super Heavyweight', 265.01, NULL);


--
-- TOC entry 5004 (class 0 OID 16486)
-- Dependencies: 219
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event VALUES (2, 27, 'Test', '2024-01-02', 'Test', NULL, NULL);
INSERT INTO public.event VALUES (3, 1, 'Jones vs Aspinal', '2024-05-30', 'My backyard ', NULL, NULL);
INSERT INTO public.event VALUES (1, 1, 'Makachev vs Poirier', '2023-12-31', 'Newark', 'UFC 302: Makhachev vs. Poirier is an upcoming mixed martial arts event produced by the Ultimate Fighting Championship that will take place on June 1, 2024, at the Prudential Center, in Newark, New Jersey, United States.', '/img/ufc_302.jpg');
INSERT INTO public.event VALUES (7, 1, 'ewq', '2024-06-14', 'ewq', 'dsadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', NULL);
INSERT INTO public.event VALUES (8, 1, 'dsadsa', '2024-06-19', 'ewq', '', NULL);


--
-- TOC entry 5008 (class 0 OID 16509)
-- Dependencies: 223
-- Data for Name: fight; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fight VALUES (2, 1, 3, 4, 3, 2, 'Welterweight', 'Co-Main', 3, NULL, NULL);
INSERT INTO public.fight VALUES (21, 1, 5, 5, NULL, NULL, 'strawweight', 'main', 3, NULL, NULL);
INSERT INTO public.fight VALUES (22, 1, 10, 11, NULL, NULL, 'lightweight', 'main', 3, NULL, NULL);
INSERT INTO public.fight VALUES (1, 1, 1, 2, 1, 3, 'Lightweight', 'Main', 3, 'McGregor VS Khabib 2', NULL);
INSERT INTO public.fight VALUES (23, 3, 9, 10, NULL, NULL, 'middleweight', 'co-main', 3, NULL, NULL);
INSERT INTO public.fight VALUES (24, 1, 1, 1, NULL, NULL, '1', '1', 1, NULL, 1);
INSERT INTO public.fight VALUES (25, 1, 5, 3, NULL, NULL, '9', '1', 1, NULL, 1);
INSERT INTO public.fight VALUES (26, 3, 2, 2, NULL, NULL, '8', '1', 6, NULL, 5);
INSERT INTO public.fight VALUES (27, 1, 2, 2, NULL, NULL, '5', '1', 7, NULL, 3);
INSERT INTO public.fight VALUES (28, 1, 2, 2, NULL, NULL, '5', '1', 7, NULL, 3);


--
-- TOC entry 5006 (class 0 OID 16500)
-- Dependencies: 221
-- Data for Name: fighter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fighter VALUES (1, 'Conor', 'McGregor', 'The Notorious', '5''9"', 155, 74, 'Southpaw', 22, 6, 0, 'Conor McGregor');
INSERT INTO public.fighter VALUES (2, 'Khabib', 'Nurmagomedov', 'The Eagle', '5''10"', 155, 70, 'Orthodox', 29, 0, 0, 'Khabib Nurmagomedov');
INSERT INTO public.fighter VALUES (3, 'Jon', 'Jones', 'Bones', '6''4"', 205, 84, 'Orthodox', 26, 1, 0, 'Jon Jones');
INSERT INTO public.fighter VALUES (4, 'Israel', 'Adesanya', 'The Last Stylebender', '6''4"', 185, 80, 'Switch', 21, 1, 0, 'Israel Adesanya');
INSERT INTO public.fighter VALUES (5, 'Amanda', 'Nunes', 'The Lioness', '5''8"', 135, 69, 'Orthodox', 21, 5, 0, 'Amanda Nunes');
INSERT INTO public.fighter VALUES (6, 'Valentina', 'Shevchenko', 'Bullet', '5''5"', 125, 67, 'Southpaw', 22, 3, 0, 'Valentina Shevchenko');
INSERT INTO public.fighter VALUES (7, 'Kamaru', 'Usman', 'The Nigerian Nightmare', '6''0"', 170, 76, 'Switch', 20, 1, 0, 'Kamaru Usman');
INSERT INTO public.fighter VALUES (8, 'Max', 'Holloway', 'Blessed', '5''11"', 145, 69, 'Orthodox', 23, 6, 0, 'Max Holloway');
INSERT INTO public.fighter VALUES (9, 'Stipe', 'Miocic', '', '6''4"', 240, 80, 'Orthodox', 20, 4, 0, 'Stipe Miocic');
INSERT INTO public.fighter VALUES (10, 'Dustin', 'Poirier', 'The Diamond', '5''9"', 155, 72, 'Orthodox', 28, 7, 1, 'Dustin Poirier');
INSERT INTO public.fighter VALUES (11, 'Justin', 'Gaethje', '', '5 11', 156, 70, '', 0, 0, 0, 'Justin Gaethje');


--
-- TOC entry 5035 (class 0 OID 16799)
-- Dependencies: 250
-- Data for Name: known_for_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5037 (class 0 OID 16808)
-- Dependencies: 252
-- Data for Name: moves; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.moves VALUES (1, 'Overhand Right', 'A powerful, looping punch thrown over the opponent’s guard.');
INSERT INTO public.moves VALUES (2, 'Leg Kick', 'A strike to the opponent''s thigh or calf with the shin.');
INSERT INTO public.moves VALUES (3, 'Superman Punch', 'A punch where the fighter feints a kick then launches into a punch.');
INSERT INTO public.moves VALUES (4, 'Flying Knee', 'A knee strike performed while jumping towards the opponent.');
INSERT INTO public.moves VALUES (5, 'Spinning Back Fist', 'A strike with the back of the fist while spinning.');
INSERT INTO public.moves VALUES (6, 'Elbow Strike', 'A close-range strike using the elbow.');
INSERT INTO public.moves VALUES (7, 'Front Kick', 'A kick executed straight on to the opponent’s body or face.');
INSERT INTO public.moves VALUES (8, 'Roundhouse Kick', 'A powerful kick coming around to strike with the shin.');
INSERT INTO public.moves VALUES (9, 'Teep Kick', 'A push kick used primarily for maintaining distance.');
INSERT INTO public.moves VALUES (10, 'Axe Kick', 'A downward kick, usually aimed at the head or shoulders.');
INSERT INTO public.moves VALUES (11, 'Uppercut', 'A close-range punch that comes from below the opponent''s line of sight.');
INSERT INTO public.moves VALUES (12, 'Shoot for a takedown', 'Quickly closing the distance to bring an opponent to the ground.');
INSERT INTO public.moves VALUES (13, 'Double Leg Takedown', 'A grappling maneuver aiming to off-balance an opponent by grabbing both legs.');
INSERT INTO public.moves VALUES (14, 'Single Leg Takedown', 'A takedown focusing on one of the opponent''s legs.');
INSERT INTO public.moves VALUES (15, 'Sprawl', 'A defensive move to prevent a takedown by sprawling backward.');
INSERT INTO public.moves VALUES (16, 'Hip Toss', 'A judo throw using the hip to lift and flip an opponent over.');
INSERT INTO public.moves VALUES (17, 'Guillotine Choke', 'A frontal chokehold from a standing position or guard.');
INSERT INTO public.moves VALUES (18, 'Rear Naked Choke', 'A choke from behind the opponent without using the gi or clothes.');
INSERT INTO public.moves VALUES (19, 'Armbar', 'A joint lock that hyperextends the arm.');
INSERT INTO public.moves VALUES (20, 'Triangle Choke', 'A choke executed from the guard by encircling the opponent’s neck and one arm with the legs.');
INSERT INTO public.moves VALUES (21, 'Kimura', 'A shoulder lock applied from various positions.');
INSERT INTO public.moves VALUES (22, 'Anaconda Choke', 'A choke involving the arm and squeezing the head and torso.');
INSERT INTO public.moves VALUES (23, 'Americana Lock', 'A lock applied on the ground targeting the shoulder.');
INSERT INTO public.moves VALUES (24, 'Omoplata', 'A shoulder lock performed using the legs.');
INSERT INTO public.moves VALUES (25, 'Kneebar', 'A leg lock that hyperextends the knee.');
INSERT INTO public.moves VALUES (26, 'Heel Hook', 'A leg lock targeting the knee or ankle, twisting the foot.');
INSERT INTO public.moves VALUES (27, 'Toe Hold', 'A submission targeting the foot, twisting around the ankle.');
INSERT INTO public.moves VALUES (28, 'Flying Armbar', 'A rapid armbar performed from a jumping position.');
INSERT INTO public.moves VALUES (29, 'Gogoplata', 'A choke using the shin against the opponent’s throat while on the back.');
INSERT INTO public.moves VALUES (30, 'Butterfly Sweep', 'Using butterfly guard hooks to unbalance and flip an opponent.');
INSERT INTO public.moves VALUES (31, 'Scissor Takedown', 'Using the legs in a scissoring motion to trip an opponent.');
INSERT INTO public.moves VALUES (32, 'Hook Punch', 'A punch that arcs in a hook shape to strike around defenses.');
INSERT INTO public.moves VALUES (33, 'Body Shot', 'A punch to the opponent’s body, typically targeting the liver or ribs.');
INSERT INTO public.moves VALUES (34, 'Switch Kick', 'A kick where the stance is switched just before the kick is thrown.');
INSERT INTO public.moves VALUES (35, 'Clinch', 'Holding an opponent close to prevent strikes, often while setting up knees and throws.');
INSERT INTO public.moves VALUES (36, 'Side Kick', 'A direct kick outwards from the side of the body.');
INSERT INTO public.moves VALUES (37, 'Spinning Heel Kick', 'A heel kick executed with a full body spin.');
INSERT INTO public.moves VALUES (38, 'Oblique Kick', 'A push kick targeting the opponent''s thigh or knee.');
INSERT INTO public.moves VALUES (39, 'Snap Kick', 'A quick, straight kick with the ball of the foot.');
INSERT INTO public.moves VALUES (40, 'Shin Check', 'Raising the shin to block a leg kick.');
INSERT INTO public.moves VALUES (41, 'Hammer Fist', 'A downward striking motion with the bottom of the fist.');
INSERT INTO public.moves VALUES (42, 'Spinning Elbow', 'An elbow strike performed while spinning.');
INSERT INTO public.moves VALUES (43, 'Lateral Drop', 'A wrestling takedown that uses the opponent''s momentum against them.');
INSERT INTO public.moves VALUES (44, 'D''Arce Choke', 'A variation of the guillotine using the opponent''s arm against their neck.');
INSERT INTO public.moves VALUES (45, 'Fisherman''s Suplex', 'A high-amplitude throw that lifts the opponent off the ground and onto their back.');
INSERT INTO public.moves VALUES (46, 'Backfist', 'A quick strike with the back of the hand.');
INSERT INTO public.moves VALUES (47, 'Cartwheel Kick', 'A kick performed during a cartwheel motion.');
INSERT INTO public.moves VALUES (48, 'Jumping Spinning Back Kick', 'A jumping version of a spinning back kick for added power.');
INSERT INTO public.moves VALUES (49, 'Bolo Punch', 'A looping punch that comes from a low angle and swings upward.');
INSERT INTO public.moves VALUES (50, 'Capoeira Kick', 'A kick derived from Capoeira, often unexpected and acrobatic.');


--
-- TOC entry 5017 (class 0 OID 16674)
-- Dependencies: 232
-- Data for Name: navbar; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.navbar VALUES (1, 'organisations', 'bi bi-building');
INSERT INTO public.navbar VALUES (2, 'events', 'bi bi-calendar-event');
INSERT INTO public.navbar VALUES (3, 'fights', 'bi bi-shield-fill-x');
INSERT INTO public.navbar VALUES (4, 'fighters', 'bi bi-person-standing');
INSERT INTO public.navbar VALUES (6, 'login', 'bi');
INSERT INTO public.navbar VALUES (7, 'logout', 'bi');


--
-- TOC entry 5020 (class 0 OID 16689)
-- Dependencies: 235
-- Data for Name: number_round; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.number_round VALUES (1, 1);
INSERT INTO public.number_round VALUES (2, 2);
INSERT INTO public.number_round VALUES (3, 3);
INSERT INTO public.number_round VALUES (4, 4);
INSERT INTO public.number_round VALUES (5, 5);
INSERT INTO public.number_round VALUES (6, 6);
INSERT INTO public.number_round VALUES (7, 7);
INSERT INTO public.number_round VALUES (8, 8);
INSERT INTO public.number_round VALUES (9, 9);
INSERT INTO public.number_round VALUES (10, 10);
INSERT INTO public.number_round VALUES (11, 11);
INSERT INTO public.number_round VALUES (12, 12);
INSERT INTO public.number_round VALUES (13, 13);
INSERT INTO public.number_round VALUES (14, 14);
INSERT INTO public.number_round VALUES (15, 15);


--
-- TOC entry 5002 (class 0 OID 16477)
-- Dependencies: 217
-- Data for Name: organisation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.organisation VALUES (1, 'UFC', 'Las vegas', 1900);
INSERT INTO public.organisation VALUES (27, 'Bellator', 'idk', 1942);
INSERT INTO public.organisation VALUES (37, 'dsa', '432', 432);


--
-- TOC entry 5031 (class 0 OID 16780)
-- Dependencies: 246
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.region VALUES (1, 'Asia', 'Asie');
INSERT INTO public.region VALUES (2, 'Africa', 'Afrique');
INSERT INTO public.region VALUES (3, 'North America', 'Amérique du Nord');
INSERT INTO public.region VALUES (4, 'South America', 'Amérique du Sud');
INSERT INTO public.region VALUES (5, 'Antarctica', 'Antarctique');
INSERT INTO public.region VALUES (6, 'Europe', 'Europe');
INSERT INTO public.region VALUES (7, 'Australia', 'Australie');


--
-- TOC entry 5015 (class 0 OID 16622)
-- Dependencies: 230
-- Data for Name: relation_strike_round; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.relation_strike_round VALUES (397, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (398, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (352, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (376, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (377, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (378, 'f', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (379, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (380, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (381, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (387, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (388, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (389, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (147, 't', 2, 1, 'KNEE_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (399, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 1);
INSERT INTO public.relation_strike_round VALUES (400, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 3);
INSERT INTO public.relation_strike_round VALUES (521, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 2);
INSERT INTO public.relation_strike_round VALUES (522, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 3);
INSERT INTO public.relation_strike_round VALUES (524, 't', 1, 2, 'ELBOW_TO_HEAD', 2, 'standing', 3);
INSERT INTO public.relation_strike_round VALUES (525, 't', 1, 2, 'ELBOW_TO_HEAD', 2, 'standing', 5);
INSERT INTO public.relation_strike_round VALUES (526, 't', 1, 2, 'ELBOW_TO_HEAD', 2, 'standing', 6);
INSERT INTO public.relation_strike_round VALUES (527, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 9);
INSERT INTO public.relation_strike_round VALUES (531, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 2);
INSERT INTO public.relation_strike_round VALUES (154, 't', 2, 1, 'KNEE_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (158, 't', 2, 1, 'KNEE_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (112, 't', 2, 1, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (113, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (114, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (115, 't', 2, 1, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (116, 't', 2, 1, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (121, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (134, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (135, 't', 1, 2, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (141, 't', 1, 2, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (157, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (159, 't', 2, 1, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (160, 't', 2, 1, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (161, 't', 2, 1, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (162, 't', 2, 1, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (186, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (194, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (353, 't', 1, 2, 'PUNCH_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (356, 't', 1, 2, 'KICK_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (358, 't', 1, 2, 'KICK_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (359, 't', 1, 2, 'KICK_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (360, 't', 1, 2, 'KICK_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (361, 't', 1, 2, 'KNEE_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (362, 't', 1, 2, 'KNEE_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (363, 't', 1, 2, 'KNEE_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (364, 't', 1, 2, 'PUNCH_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (365, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (366, 't', 1, 2, 'PUNCH_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (367, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (368, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (369, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (370, 'f', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (371, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (372, 'f', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (382, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (383, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (390, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (391, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (392, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (393, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (268, 't', 10, 11, 'KNEE_TO_BODY', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (269, 't', 10, 11, 'KNEE_TO_LEG', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (271, 't', 10, 11, 'ELBOW_TO_BODY', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (275, 't', 10, 11, 'KNEE_TO_HEAD', 5, 'clinch', 0);
INSERT INTO public.relation_strike_round VALUES (276, 't', 10, 11, 'KNEE_TO_BODY', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (277, 't', 10, 11, 'KNEE_TO_HEAD', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (287, 'f', 11, 10, 'TAKEDOWN', 4, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (288, 'f', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (289, 'f', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (290, 'f', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (291, 'f', 11, 10, 'TAKEDOWN', 4, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (292, 'f', 11, 10, 'TAKEDOWN', 4, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (293, 'f', 10, 11, 'TAKEDOWN', 4, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (294, 'f', 10, 11, 'TAKEDOWN', 4, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (295, 'f', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (296, 'f', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (297, 'f', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (298, 't', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (299, 't', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (300, 't', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (301, 't', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (302, 't', 11, 10, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (303, 't', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (304, 't', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (305, 'f', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (306, 't', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (307, 't', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (308, 't', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (309, 'f', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (310, 't', 10, 11, 'TAKEDOWN', 6, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (311, 't', 10, 11, 'TAKEDOWN', 0, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (312, 't', 1, 2, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (313, 'f', 1, 2, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (314, 'f', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (315, 'f', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (401, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 19);
INSERT INTO public.relation_strike_round VALUES (403, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 4);
INSERT INTO public.relation_strike_round VALUES (404, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 6);
INSERT INTO public.relation_strike_round VALUES (405, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 8);
INSERT INTO public.relation_strike_round VALUES (406, 't', 1, 2, 'ELBOW_TO_HEAD', 0, 'standing', 2);
INSERT INTO public.relation_strike_round VALUES (407, 't', 1, 2, 'ELBOW_TO_BODY', 0, 'standing', 4);
INSERT INTO public.relation_strike_round VALUES (408, 't', 1, 2, 'ELBOW_TO_BODY', 0, 'standing', 5);
INSERT INTO public.relation_strike_round VALUES (483, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (484, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (485, 'f', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (486, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (487, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (488, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (489, 't', 2, 1, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (490, 't', 2, 1, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (163, 't', 2, 1, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (164, 't', 2, 1, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (165, 't', 2, 1, 'KNEE_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (166, 't', 2, 1, 'KNEE_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (167, 't', 2, 1, 'KNEE_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (172, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (173, 't', 1, 2, 'KNEE_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (183, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (185, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (357, 't', 1, 2, 'KNEE_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (402, 'f', 1, 2, 'ELBOW_TO_HEAD', 0, 'standing', 33);
INSERT INTO public.relation_strike_round VALUES (409, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (410, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (411, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (412, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 1);
INSERT INTO public.relation_strike_round VALUES (413, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 3);
INSERT INTO public.relation_strike_round VALUES (414, 't', 2, 1, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (415, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (416, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (417, 't', 2, 1, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (418, 't', 2, 1, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (419, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (420, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (421, 't', 1, 2, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (422, 't', 1, 2, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (423, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (424, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (425, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (426, 'f', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (427, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (428, 'f', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (429, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 19);
INSERT INTO public.relation_strike_round VALUES (430, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 4);
INSERT INTO public.relation_strike_round VALUES (431, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 6);
INSERT INTO public.relation_strike_round VALUES (432, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 8);
INSERT INTO public.relation_strike_round VALUES (433, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (434, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (435, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (436, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (437, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (438, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (439, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (440, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (441, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (442, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (443, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (444, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (445, 'f', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (446, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (447, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (448, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (449, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 1);
INSERT INTO public.relation_strike_round VALUES (450, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 3);
INSERT INTO public.relation_strike_round VALUES (451, 't', 2, 1, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (452, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (453, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (454, 't', 2, 1, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (455, 't', 2, 1, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (456, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (457, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (458, 't', 1, 2, 'KNEE_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (459, 't', 1, 2, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (460, 't', 2, 1, 'KNEE_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (461, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (462, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (463, 'f', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (464, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (465, 'f', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (466, 't', 1, 2, 'PUNCH_TO_BODY', 1, 'standing', 19);
INSERT INTO public.relation_strike_round VALUES (467, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 4);
INSERT INTO public.relation_strike_round VALUES (468, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 6);
INSERT INTO public.relation_strike_round VALUES (469, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 8);
INSERT INTO public.relation_strike_round VALUES (470, 't', 1, 2, 'KNEE_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (471, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (472, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (473, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (474, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (475, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (476, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (477, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (478, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (479, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (480, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (481, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (482, 'f', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (491, 't', 2, 1, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (492, 't', 2, 1, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (493, 't', 1, 2, 'PUNCH_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (494, 't', 1, 2, 'KICK_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (316, 'f', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (317, 'f', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (318, 'f', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (319, 'f', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (320, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (321, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (322, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (323, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (324, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (325, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (326, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (327, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (328, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (329, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (330, 't', 2, 1, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (331, 'f', 1, 2, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (332, 't', 1, 2, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (333, 'f', 1, 2, 'TAKEDOWN', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (335, 't', 1, 2, 'KNEE_TO_BODY', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (338, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (339, 't', 1, 2, 'ELBOW_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (340, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (341, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (342, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (344, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (345, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (346, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (347, 't', 1, 2, 'ELBOW_TO_LEG', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (350, 't', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (373, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (374, 't', 1, 2, 'ELBOW_TO_HEAD', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (375, 'f', 1, 2, 'ELBOW_TO_BODY', 1, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (384, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (385, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (386, 't', 1, 2, 'PUNCH_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (394, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (395, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (396, 't', 1, 2, 'PUNCH_TO_HEAD', 2, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (495, 't', 1, 2, 'KICK_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (496, 't', 1, 2, 'KICK_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (497, 't', 1, 2, 'KICK_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (498, 't', 1, 2, 'KNEE_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (499, 't', 1, 2, 'KNEE_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (500, 't', 1, 2, 'KNEE_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (501, 't', 1, 2, 'PUNCH_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (502, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (503, 't', 1, 2, 'PUNCH_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (504, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (505, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (506, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (507, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (508, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (509, 't', 2, 1, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (510, 't', 2, 1, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (511, 't', 2, 1, 'KNEE_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (512, 't', 2, 1, 'KNEE_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (513, 't', 2, 1, 'KNEE_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (514, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (515, 't', 1, 2, 'KNEE_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (516, 't', 1, 2, 'KNEE_TO_LEG', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (517, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (518, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (519, 't', 1, 2, 'PUNCH_TO_HEAD', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (520, 't', 1, 2, 'PUNCH_TO_BODY', 3, 'standing', 0);
INSERT INTO public.relation_strike_round VALUES (523, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 1);
INSERT INTO public.relation_strike_round VALUES (528, 't', 1, 2, 'ELBOW_TO_HEAD', 3, 'standing', 2);
INSERT INTO public.relation_strike_round VALUES (529, 't', 1, 2, 'ELBOW_TO_BODY', 3, 'standing', 3);
INSERT INTO public.relation_strike_round VALUES (530, 't', 1, 2, 'ELBOW_TO_LEG', 3, 'standing', 5);
INSERT INTO public.relation_strike_round VALUES (532, 't', 1, 2, 'KICK_TO_HEAD', 1, 'standing', 55);


--
-- TOC entry 5010 (class 0 OID 16538)
-- Dependencies: 225
-- Data for Name: round; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.round VALUES (1, 1, 1, 300, 100, 50, NULL);
INSERT INTO public.round VALUES (2, 1, 2, 300, 30, 60, NULL);
INSERT INTO public.round VALUES (3, 1, 3, 245, 50, 20, NULL);
INSERT INTO public.round VALUES (4, 22, 1, 300, 0, 0, NULL);
INSERT INTO public.round VALUES (5, 22, 2, 300, 0, 0, NULL);
INSERT INTO public.round VALUES (6, 22, 3, 300, 0, 0, NULL);
INSERT INTO public.round VALUES (13, 27, 1, NULL, NULL, NULL, 3);
INSERT INTO public.round VALUES (14, 27, 2, NULL, NULL, NULL, 3);
INSERT INTO public.round VALUES (15, 27, 3, NULL, NULL, NULL, 3);
INSERT INTO public.round VALUES (16, 27, 4, NULL, NULL, NULL, 3);
INSERT INTO public.round VALUES (17, 27, 5, NULL, NULL, NULL, 3);
INSERT INTO public.round VALUES (18, 27, 6, NULL, NULL, NULL, 3);
INSERT INTO public.round VALUES (19, 27, 7, NULL, NULL, NULL, 3);


--
-- TOC entry 5022 (class 0 OID 16699)
-- Dependencies: 237
-- Data for Name: round_length; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.round_length VALUES (1, 1);
INSERT INTO public.round_length VALUES (2, 2);
INSERT INTO public.round_length VALUES (3, 3);
INSERT INTO public.round_length VALUES (4, 4);
INSERT INTO public.round_length VALUES (5, 5);
INSERT INTO public.round_length VALUES (6, 6);
INSERT INTO public.round_length VALUES (7, 7);
INSERT INTO public.round_length VALUES (8, 8);
INSERT INTO public.round_length VALUES (9, 9);
INSERT INTO public.round_length VALUES (10, 10);


--
-- TOC entry 5011 (class 0 OID 16550)
-- Dependencies: 226
-- Data for Name: strike; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.strike VALUES ('ELBOW_TO_HEAD', 'head', 'elbow');
INSERT INTO public.strike VALUES ('KNEE_TO_HEAD', 'head', 'knee');
INSERT INTO public.strike VALUES ('ELBOW_TO_BODY', 'body', 'elbow');
INSERT INTO public.strike VALUES ('KNEE_TO_BODY', 'body', 'knee');
INSERT INTO public.strike VALUES ('ELBOW_TO_LEG', 'leg', 'elbow');
INSERT INTO public.strike VALUES ('KNEE_TO_LEG', 'leg', 'knee');
INSERT INTO public.strike VALUES ('TAKEDOWN', NULL, NULL);
INSERT INTO public.strike VALUES ('PUNCH_TO_BODY', 'body', 'punch');
INSERT INTO public.strike VALUES ('PUNCH_TO_HEAD', 'head', 'punch');
INSERT INTO public.strike VALUES ('PUNCH_TO_LEG', 'leg', 'punch');
INSERT INTO public.strike VALUES ('KICK_TO_BODY', 'body', 'kick');
INSERT INTO public.strike VALUES ('KICK_TO_HEAD', 'head', 'kick');
INSERT INTO public.strike VALUES ('KICK_TO_LEG', 'leg', 'kick');


--
-- TOC entry 5013 (class 0 OID 16564)
-- Dependencies: 228
-- Data for Name: win; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 238
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
--
-- TOC entry 4834 (class 2606 OID 16734)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 4836 (class 2606 OID 16732)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 16778)
-- Name: background_tags background_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_tags
    ADD CONSTRAINT background_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 16797)
-- Name: behavior_tags behavior_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.behavior_tags
    ADD CONSTRAINT behavior_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 16740)
-- Name: card_type card_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card_type
    ADD CONSTRAINT card_type_pkey PRIMARY KEY (card_type_id);


--
-- TOC entry 4807 (class 2606 OID 16493)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (event_id);


--
-- TOC entry 4811 (class 2606 OID 16516)
-- Name: fight fight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fight_pkey PRIMARY KEY (fight_id);


--
-- TOC entry 4809 (class 2606 OID 16507)
-- Name: fighter fighter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fighter
    ADD CONSTRAINT fighter_pkey PRIMARY KEY (fighter_id);


--
-- TOC entry 4844 (class 2606 OID 16804)
-- Name: known_for_tags known_for_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.known_for_tags
    ADD CONSTRAINT known_for_tags_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 16815)
-- Name: moves moves_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moves
    ADD CONSTRAINT moves_pkey PRIMARY KEY (id);


--
-- TOC entry 4824 (class 2606 OID 16681)
-- Name: navbar navbar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.navbar
    ADD CONSTRAINT navbar_pkey PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 16750)
-- Name: number_round number_round_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.number_round
    ADD CONSTRAINT number_round_pkey PRIMARY KEY (number_round_id);


--
-- TOC entry 4805 (class 2606 OID 16484)
-- Name: organisation organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisation
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (organisation_id);


--
-- TOC entry 4840 (class 2606 OID 16787)
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 16627)
-- Name: relation_strike_round relation_strike_round_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relation_strike_round
    ADD CONSTRAINT relation_strike_round_pkey PRIMARY KEY (strike_to_round_id);


--
-- TOC entry 4832 (class 2606 OID 16760)
-- Name: round_length round_length_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.round_length
    ADD CONSTRAINT round_length_pkey PRIMARY KEY (round_length_id);


--
-- TOC entry 4813 (class 2606 OID 16543)
-- Name: round round_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.round
    ADD CONSTRAINT round_pkey PRIMARY KEY (round_id);


--
-- TOC entry 4815 (class 2606 OID 16603)
-- Name: strike strike_code_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strike
    ADD CONSTRAINT strike_code_pk PRIMARY KEY (strike_code);


--
-- TOC entry 4826 (class 2606 OID 16688)
-- Name: division ufc_weight_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.division
    ADD CONSTRAINT ufc_weight_classes_pkey PRIMARY KEY (division_id);


--
-- TOC entry 4817 (class 2606 OID 16571)
-- Name: win win_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.win
    ADD CONSTRAINT win_pkey PRIMARY KEY (win_id);


--
-- TOC entry 4818 (class 1259 OID 16635)
-- Name: fki_strike_code_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_strike_code_fk ON public.relation_strike_round USING btree (strike_code);


--
-- TOC entry 4819 (class 1259 OID 16647)
-- Name: fki_striker; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_striker ON public.relation_strike_round USING btree (target_id);


--
-- TOC entry 4820 (class 1259 OID 16641)
-- Name: fki_striker_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_striker_id_fk ON public.relation_strike_round USING btree (striker_id);


--
-- TOC entry 4847 (class 2606 OID 16494)
-- Name: event event_organisation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES public.organisation(organisation_id);


--
-- TOC entry 4848 (class 2606 OID 16532)
-- Name: fight fight_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fight_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event(event_id);


--
-- TOC entry 4849 (class 2606 OID 16517)
-- Name: fight fight_fighter1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fight_fighter1_id_fkey FOREIGN KEY (fighter1_id) REFERENCES public.fighter(fighter_id);


--
-- TOC entry 4850 (class 2606 OID 16522)
-- Name: fight fight_fighter2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fight_fighter2_id_fkey FOREIGN KEY (fighter2_id) REFERENCES public.fighter(fighter_id);


--
-- TOC entry 4851 (class 2606 OID 16527)
-- Name: fight fight_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fight_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.fighter(fighter_id);


--
-- TOC entry 4855 (class 2606 OID 16654)
-- Name: relation_strike_round fk_strike_code; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relation_strike_round
    ADD CONSTRAINT fk_strike_code FOREIGN KEY (strike_code) REFERENCES public.strike(strike_code);


--
-- TOC entry 4856 (class 2606 OID 16642)
-- Name: relation_strike_round receiver_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relation_strike_round
    ADD CONSTRAINT receiver_id_fk FOREIGN KEY (target_id) REFERENCES public.fighter(fighter_id) NOT VALID;


--
-- TOC entry 4852 (class 2606 OID 16544)
-- Name: round round_fight_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.round
    ADD CONSTRAINT round_fight_id_fkey FOREIGN KEY (fight_id) REFERENCES public.fight(fight_id);


--
-- TOC entry 4857 (class 2606 OID 16636)
-- Name: relation_strike_round striker_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relation_strike_round
    ADD CONSTRAINT striker_id_fk FOREIGN KEY (striker_id) REFERENCES public.fighter(fighter_id) NOT VALID;


--
-- TOC entry 4853 (class 2606 OID 16572)
-- Name: win win_fight_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.win
    ADD CONSTRAINT win_fight_id_fkey FOREIGN KEY (fight_id) REFERENCES public.fight(fight_id);


--
-- TOC entry 4854 (class 2606 OID 16577)
-- Name: win win_fighter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.win
    ADD CONSTRAINT win_fighter_id_fkey FOREIGN KEY (fighter_id) REFERENCES public.fighter(fighter_id);


-- Completed on 2024-06-07 18:49:40

--
-- PostgreSQL database dump complete
--

END;