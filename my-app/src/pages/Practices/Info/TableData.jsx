import { IoIosStar } from "react-icons/io";
import { MdOutlineVerifiedUser } from "react-icons/md";

const TableData=[
  {
    id:1,
    tableHead: ["Type", "Costing", "Best When", "Comments"]
  },
  {
    id:2,
    tableBody:[
        [
          "Project-based", 
          "Fixed based on milestones", 
          [
            {icon:<MdOutlineVerifiedUser />, info: "Requirements are very clear."},
            {icon:<MdOutlineVerifiedUser />, info: "Team will be a significant addition to existing team or all of it."},
            {icon:<MdOutlineVerifiedUser />,  info: "Team’s capabilities are known well."}
          ],
          [
            {icon: <IoIosStar />, info: "Agile possible as well if client is fully engaged in the development process."},
            {icon: <IoIosStar />, info: "Maximum cost savings possible as onus is onto us to deliver in-time on-budget."}
          ]

        ],
        [
          "Resource-based engagement",
          "Hourly or daily rates based on type of resource engaged",
          [ {icon:<MdOutlineVerifiedUser />, info: "Want to augment your team with more resources."},
            {icon:<MdOutlineVerifiedUser />, info: "Unsure of exact requirements."},
            {icon:<MdOutlineVerifiedUser />, info: " Starting off for the first time."}
          ],
          [
            { icon:<IoIosStar />, info: " We could also offer blended rates based on pre-set conditions so smoothen the billing." },
            { icon:<IoIosStar />, info:"Great way to start off with us." }
          ]
        ],
        [
            "Partnership Engagement",
            "Pre-defined hourly rate (typically at cost) + Share of profits earned",
            [
                {icon:<MdOutlineVerifiedUser />, info: "Not enough capital to take a risk."},
                {icon:<MdOutlineVerifiedUser />, info: "Expect the product/solution to be sold to others through you."},
                {icon:<MdOutlineVerifiedUser />, info: "Willingness to share risk and as well as gains."}
            ],
            [
               {icon:<IoIosStar />, info:"Excellent combination of your domain knowledge and our technology skills to form a win-win partnership."},
               {icon:<IoIosStar />, info:"Shared IP."}
            ]
        ],
        [
            "Dedicated development facility",
            "Flexible based on type of needs and resources",
            [
                {icon:<MdOutlineVerifiedUser />, info: "Best for setting up low-cost offshore center without the headache of managing it."},
            ],
            [
                {icon:<IoIosStar />, info: "IP is owned by you."},
                {icon:<IoIosStar />, info: "Can set up facility based on your requirements and corporate practices."}
            ]
        ]
    ]
  }
];
export default TableData;