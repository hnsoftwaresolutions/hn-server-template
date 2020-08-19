'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'app',
            function () {
                let src;
                let expect;
                let expressStub;

                before(function () {
                    expect = chai.expect;
                    chai.use(sinonChai);

                    expressStub = sinon.stub()
                        .returns('expressStub');

                    src = proxyquire(
                        '../../src/app.js',
                        {
                            express: expressStub
                        }
                    );
                });

                it(
                    'should call once express with no parameters',
                    function () {
                        expect(expressStub)
                            .to
                            .have
                            .been
                            .calledOnceWithExactly();
                    }
                );

                it(
                    'should export correct data',
                    function () {
                        expect(src)
                            .to
                            .equal('expressStub');
                    }
                );
            }
        );
    }
);
