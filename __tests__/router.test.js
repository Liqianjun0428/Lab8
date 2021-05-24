import { TestScheduler } from "@jest/core";
import { pushToHistory } from "../scripts/router.js";

/**
 * @jest-environment jsdom
 */
describe('test history stack length and current state obj', ()=>{
    test('test history stack length',()=>{
        pushToHistory('settings');
        expect(history.length).toBe(2);
        pushToHistory('entry',1);
        expect(history.length).toBe(3);
        pushToHistory('home');
        expect(history.length).toBe(4);
        for(var i = 0; i< 10; i++){
            pushToHistory('entry',i);
            var length = 5+i;
            expect(history.length).toBe(length);
        }
        
    });

    test('test current state obj',()=>{
        pushToHistory('settings');
        expect(history.state.page).toBe('settings');
        pushToHistory('home');
        expect(history.state.page).not.toBeDefined();
        for(var i = 0; i< 10; i++){
            pushToHistory('entry',i);
            var page = `entry${i}`;
            expect(history.state.page).toBe(page);
        }
    });
});