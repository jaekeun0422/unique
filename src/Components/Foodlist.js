import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Foodlist = (props) => {

  console.log(`props(=searchWord) is ${props.area}`);
  const searchWord = props.area; 

  const [allData, setData] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [SeoulData, setSeoulData] = useState([]);

  let url = "https://openapi.gg.go.kr/TBUNIQUEVENUELISTM?key=fc91bcf819c04390928593646e6ee7ee&type=json&pSize=50";

  useEffect(() => { // 버튼 click없이 자동으로 실행
    // async를 사용하는 다른 함수 선언
   const fetchData = async () => {
    const response = await axios.get(url);
      console.log('조회된 전체 데이터');
      console.log(response.data.TBUNIQUEVENUELISTM);
      console.log('조회된 전체 데이터[1]');
      console.log(response.data.TBUNIQUEVENUELISTM[1]);
      console.log('조회된 row[0].INST_NM');
      console.log(response.data.TBUNIQUEVENUELISTM[1].row[0].INST_NM);

      // 전체 데이터 - 내림차순 정렬
      const allData=response.data.TBUNIQUEVENUELISTM[1].row
      .sort((a,b) => a.INST_NM > b.INST_NM ? -1 : a.INST_NM > b.INST_NM ? 1 : 0) // 내림차순 정렬
      .map(
          (item)=>{
              return(
                  // list item일 때 key props 넣어야 함. 없으면 warning 나옴
                  <tr key={item.INST_NM} className="stripe">
                    <td>{item.REGION_NM}</td>
                    <td>{item.INST_NM}</td>
                    <td>{item.REFINE_ROADNM_ADDR}</td>
                  </tr>
              );
          }
      )
      setData(allData);

      // filter() test
      const filterData=response.data.TBUNIQUEVENUELISTM[1].row
      .filter(
        (item) => item.REGION_NM.toString().toLowerCase().includes(searchWord.toString().toLowerCase()))
      console.log(`filter() testing ... searchWord is ${searchWord}`); 
      console.log(`*** Testing ***${searchWord} 데이터[오름차순 정렬] : `, filterData);  
      setfilterData(filterData);

      // 지역 데이터 - 오름차순 정렬
      const SeoulData=response.data.TBUNIQUEVENUELISTM[1].row
        .filter(
          (item) => item.REGION_NM.toString().toLowerCase().includes(searchWord.toString().toLowerCase()))
        .sort((a,b) => a.INST_NM < b.INST_NM ? -1 : a.INST_NM > b.INST_NM ? 1 : 0) // 오름차순 정렬
        .map(
          (item)=>{
            return(
              <div className="card border-success mb-3">
                <div className="card-header">{item.INST_NM}</div>
                <div className="card-body">{item.REFINE_ROADNM_ADDR}</div>
              </div>
            );
          }
        )
      setSeoulData(SeoulData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchWord])

  // 데이터 체크 (마지막으로)
  console.log("전체 데이터[내림차순 정렬] : ", allData);
  console.log(`${searchWord} 데이터[오름차순 정렬] : `, SeoulData);
  return (
    <div>
      {/* <h2>JSON 데이터 보기</h2> */}
        {/* {filterData && <textarea rows={20} cols={100} value={JSON.stringify(filterData, null, 2)} readOnly={true}/>} */}
      <div className='card-all'>
        {SeoulData}   
      </div>
    </div>
  )
}

export default Foodlist;
