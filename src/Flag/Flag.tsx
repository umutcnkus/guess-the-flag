import {Image} from 'antd';
import {useState} from 'react';
import {motion} from 'framer-motion';
import './Flag.css';

interface FlagProps {
    countries: string[];
    order: number[];
}

function Flag({countries, order}: FlagProps) {
    const [visible, setVisible] = useState(false);
    return (
        <motion.div
            key={countries[0]}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        >
            <Image
                className='ant-card-bordered'
                preview={{visible: false}}
                height={'20rem'}
                src={"https://flagcdn.com/" + countries[0].toLowerCase() + ".svg"}
                onClick={() => setVisible(true)}
            />
            <div style={{display: 'none'}}>
                <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                    {order.map((idx) => <Image key={idx} width={100} src={"https://flagcdn.com/" + countries[idx].toLowerCase() + ".svg"} /> )}
                </Image.PreviewGroup>
            </div>
        </motion.div>
    );
}

export default Flag;
