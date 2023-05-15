# TodoList

TOdoList 구현

1.주석을 달아서 코드에 대한 설명 보여주기(주석이 부족함)

2. checkIsAllCompleted()함수 
//각각의 할 일이 완료 처리가 될 때와 새로운 
//할 일이 추가 될때마다 전체 할 일의 완료 상태를 파악
----------------------------------------------------------------------------------------------
const checkIsAllCompleted = () => {  //전체 완료 처리 확인
    if(getAllTodos().length === getCompletedTodos().length ){ 
        setIsAllCompleted(true); 
        completeAllBtnElem.classList.add('checked'); //체크 
    }else { //아니면 
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked'); //체크 없애기
    }
}//todos배열의 길이와, 완료된 todos의 길이를 비교해서 isAllCompleted의 상태를 변경하고 
//checked 클래스 네임을 추가 하거나 삭제한다.

3. onClickCompleteAll()함수 //현재 todos의 완료 상태 여부를 파악하여, 전체 완료를 처리함.
----------------------------------------------------------------------------------------------
const onClickCompleteAll = () => {  
    if(!getAllTodos().length) return; //만약 todos배열의 길이가 0이면 return

    if(isAllCompleted) incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리 
    else completeAll(); //isAllComplete가 false이면 todos를 전체 완료 처리
    setIsAllCompleted(!isAllCompleted); 
    paintTodos(); 
    setLeftItems() //남은 할 일 개수 표시
}

4.디렉토리로 파일 정리하기
