
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const MeetTeamCard = ({ imgSrc, name, expertise }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    return (
        <motion.div
            ref={ref}
            className="card p-9 h-[400px] mt-12 shadow-xl bg-fuchsia-200"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
        >
            <figure>
                <img className="" src={imgSrc} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h3 className="font-lato text-2xl font-bold">{name}</h3>
                <p className="font-lato">{expertise}</p>
                <div className="flex flex-row mt-2 text-center gap-6 text-xl text-[#E76F51] ml-9">
                    <FaFacebook />
                    <FaLinkedin />
                    <FaTwitter />
                </div>
            </div>
        </motion.div>
    );
};

const MeetTeam = () => {
    return (
        <div className="text-center mt-24 max-w-screen-xl mx-auto px-4 py-5">
            <div>
                <h1 className="mb-5  text-3xl md:text-5xl font-bold ">Meet the team section</h1>
                <p className="mb-2 ">
                    Meet the Minds Behind the Magic: Get to Know the Creative Forces Shaping Our Story!
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
                <MeetTeamCard
                    imgSrc="https://i.ibb.co/FYn3zM4/member1.png"
                    name="Awlad Hossain"
                    expertise="Interactive Story Architect"
                />
                <MeetTeamCard
                    imgSrc="https://i.ibb.co/TkhYfrG/member2.png"
                    name="Safia Chowdhury"
                    expertise="Creative Writing Specialist"
                />
                <MeetTeamCard
                    imgSrc="https://i.ibb.co/tqRk6nt/member3.png"
                    name="Rokib Hossain"
                    expertise="Reader Engagement Analyst"
                />
                <MeetTeamCard imgSrc="https://i.ibb.co/8sBVbRH/member4.png" name="Chaity" expertise="Content Curator & Editor" />
            </div>
        </div>
    );
};

export default MeetTeam;
